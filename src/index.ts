import { getOctokit, context } from "@actions/github";
import {
  getInput,
  info,
  startGroup,
  endGroup,
  notice,
  warning,
  error,
} from "@actions/core";
import { exec } from "@actions/exec";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import process from "node:process";
import path from "node:path";
import { existsSync } from "node:fs";
import { countReset } from "node:console";

const HUNK_HEADER_PATTERN = /^@@ \-\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
const WORKING_DIRECTORY = process.cwd();

async function run(
  mock:
    | {
        token: string;
        owner: string;
        repo: string;
        number: number;
      }
    | undefined = undefined
) {
  startGroup("ESLint");
  const eslintPath =
    mock === undefined ? getInput("eslint-path") : "node_modules/.bin/eslint";
  if (!existsSync(eslintPath)) {
    throw new Error(`ESLint cannot be found at ${existsSync}`);
  }
  let stdout = "";
  let stderr = "";
  info(`Using ESLint from: ${path.resolve(WORKING_DIRECTORY, eslintPath)}`);
  try {
    await exec(
      path.resolve(WORKING_DIRECTORY, eslintPath),
      [".", "--format", "json"],
      {
        listeners: {
          stdout: (data: Buffer) => {
            stdout += data.toString();
          },
          stderr: (data: Buffer) => {
            stderr += data.toString();
          },
        },
      }
    );
  } catch (error) {}
  const results = JSON.parse(stdout);

  const IndexedResults: {
    [file: string]: {
      filePath: string;
      source: string;
      messages: {
        severity: number;
        line: number;
        column: number;
        endColumn: number;
        message: string;
        ruleId: string;
        fix?: { range: number[]; text: string };
        suggestions?: {
          messageId: string;
          fix: { range: number[]; text: string };
          desc: string;
        }[];
      }[];
    };
  } = {};
  for (const file of results) {
    const relativePath = path.relative(WORKING_DIRECTORY, file.filePath);
    info(`File name: ${relativePath}`);
    IndexedResults[relativePath] = file;
    for (const message of file.messages) {
      info(`  [${message.severity}] ${message.message} @ ${message.line}`);
      if (message.suggestions) {
        info(`  Suggestions (${message.suggestions.length}):`);
        for (const suggestion of message.suggestions) {
          info(`    ${suggestion.desc} (${suggestion.messageId})`);
        }
      }
    }
  }
  endGroup();

  startGroup("GitHub Pull Request");
  const githubToken = mock?.token || getInput("github-token");
  const octokit = getOctokit(githubToken);

  let pullRequest: PullRequest;
  if (mock) {
    const response = await octokit.rest.pulls.get({
      owner: mock.owner,
      repo: mock.repo,
      pull_number: mock.number,
    });
    pullRequest = response.data as PullRequest;
  } else {
    pullRequest = context.payload.pull_request as PullRequest;
  }
  const owner = mock?.owner || context.repo.owner;
  const repo = mock?.repo || context.repo.repo;
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;

  info(`Owner: ${owner}`);
  info(`Repo: ${repo}`);
  info(`Pull request number: ${mock?.number || pullRequest.number}`);
  info(`Base SHA: ${baseSha}`);
  info(`Head SHA: ${headSha}`);

  const response = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullRequest.number,
  });
  info(`Files (${response.data.length}):`);
  for (const file of response.data) {
    info(`  File name: ${file.filename}`);
    info(`  File state: ${file.status}`);

    const modifiedLines = [];
    const indexedModifiedLines: { [line: string]: true } = {};
    let currentLine = 0;
    let remainingLinesInHunk = 0;
    const lines = file.patch?.split("\n");
    if (lines) {
      for (const line of lines) {
        if (remainingLinesInHunk === 0) {
          const matches = line.match(HUNK_HEADER_PATTERN);
          currentLine = parseInt(matches?.[2] || "1");
          remainingLinesInHunk = parseInt(matches?.[4] || "1");
          if (!currentLine || !remainingLinesInHunk) {
            throw new Error(
              `Expecting hunk header in ${file.filename} but seeing ${line}.`
            );
          }
        } else if (line[0] === "-") {
          continue;
        } else {
          if (line[0] === "+") {
            modifiedLines.push(currentLine);
            indexedModifiedLines[currentLine] = true;
          }
          currentLine++;
          remainingLinesInHunk--;
        }
      }
    }

    info(`  File modified lines: ${modifiedLines.join()}`);
    if (file.patch !== undefined) {
      info(
        `  File patch: \n${file.patch
          .split("\n")
          .map((line) => "    " + line)
          .join("\n")}\n`
      );
    }

    const result = IndexedResults[file.filename];
    if (result) {
      const source = result.source.split("\n");
      const sourceLineLengths = source.map((line) => line.length);
      for (const message of result.messages) {
        switch (message.severity) {
          case 0:
            notice("", {
              file: file.filename,
              startLine: message.line,
              startColumn: message.column,
              endColumn: message.endColumn,
              title: `${message.message} (${message.ruleId})`,
            });
            break;
          case 1:
            warning("", {
              file: file.filename,
              startLine: message.line,
              startColumn: message.column,
              endColumn: message.endColumn,
              title: `${message.message} (${message.ruleId})`,
            });
            break;
          case 2:
            error("", {
              file: file.filename,
              startLine: message.line,
              startColumn: message.column,
              endColumn: message.endColumn,
              title: `${message.message} (${message.ruleId})`,
            });
            break;
          default:
            throw new Error(`Unrecognized severity: ${message.severity}`);
        }
        if (indexedModifiedLines[message.line]) {
          info(`  Matched line: ${message.line}`);
          if (message.fix) {
            const beforeSourceLength = sourceLineLengths
              .slice(0, message.line - 1)
              .reduce((previous, current) => previous + current, 0);
            const replaceIndexStart = message.fix.range[0] - beforeSourceLength;
            const replaceIndexEnd = message.fix.range[1] - beforeSourceLength;
            const originalLine = source[message.line - 1];
            const replacedLine =
              originalLine.substring(0, replaceIndexStart) +
              message.fix.text +
              originalLine.substring(replaceIndexEnd);
            info(
              "    Fix:\n" +
                "      " +
                `${originalLine} => ${replacedLine} @ ${message.line}`.trim()
            );
            const response = await octokit.rest.pulls.createReviewComment({
              owner,
              repo,
              body: "```suggestion\n" + `${replacedLine}\n` + "```\n",
              pull_number: pullRequest.number,
              commit_id: headSha,
              path: file.filename,
              side: "RIGHT",
              line: message.line,
            });
            info(`      Commented`);
          }
          if (message.suggestions) {
            for (const suggestion of message.suggestions) {
              const beforeSourceLength = sourceLineLengths
                .slice(0, message.line - 1)
                .reduce((previous, current) => previous + current, 0);
              const replaceIndexStart =
                suggestion.fix.range[0] - beforeSourceLength;
              const replaceIndexEnd =
                suggestion.fix.range[1] - beforeSourceLength;
              const originalLine = source[message.line - 1];
              const replacedLine =
                originalLine.substring(0, replaceIndexStart) +
                suggestion.fix.text +
                originalLine.substring(replaceIndexEnd);
              info(
                "    Suggestion:\n" +
                  "      " +
                  `${originalLine} => ${replacedLine} @ ${message.line}`.trim()
              );
              const response = await octokit.rest.pulls.createReviewComment({
                owner,
                repo,
                body:
                  `${suggestion.desc} (${suggestion.messageId})\n\n` +
                  "```suggestion\n" +
                  `${replacedLine}\n` +
                  "```\n",
                pull_number: pullRequest.number,
                commit_id: headSha,
                path: file.filename,
                side: "RIGHT",
                line: message.line,
              });
              info(`      Commented`);
            }
          }
        }
      }
    }
  }
  endGroup();
}

if (process.argv.length === 6) {
  run({
    token: process.argv[2],
    owner: process.argv[3],
    repo: process.argv[4],
    number: parseInt(process.argv[5]),
  });
} else {
  run();
}
