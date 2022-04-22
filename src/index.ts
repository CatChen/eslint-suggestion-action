import { context } from "@actions/github";
import { GitHub, getOctokitOptions } from "@actions/github/lib/utils";
import {
  getInput,
  getBooleanInput,
  info,
  startGroup,
  endGroup,
  notice,
  warning,
  error,
} from "@actions/core";
import { exec } from "@actions/exec";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import process from "node:process";
import path from "node:path";
import { existsSync } from "node:fs";
import { createRequire } from "module";

const HUNK_HEADER_PATTERN = /^@@ \-\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
const RULE_UNSCOPE_PATTERN = /^(@.*?\/)?(.*)$/;
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
  const outOfScopeAnnotations =
    mock === undefined ? getBooleanInput("out-of-scope-annotations") : false;
  const suppressFixes =
    mock === undefined ? getBooleanInput("suppress-fixes") : false;
  const suppressSuggestions =
    mock === undefined ? getBooleanInput("suppress-suggestions") : false;
  const suppressAnnotations =
    mock === undefined ? getBooleanInput("suppress-annotations") : false;

  startGroup("ESLint");
  const githubWorkspace =
    mock === undefined ? getInput("github-workspace") : path.resolve(".");
  const require = createRequire(githubWorkspace);
  const eslintJsPath = path.resolve(
    githubWorkspace,
    "./node_modules/eslint/lib/api.js"
  );
  if (!existsSync(eslintJsPath)) {
    throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
  }
  info(`Using ESLint from: ${eslintJsPath}`);
  const { ESLint } = require(eslintJsPath);
  const eslintConfig = await new ESLint().calculateConfigForFile(
    "package.json"
  );
  const eslint = new ESLint({ baseConfig: eslintConfig });

  const eslintBinPath = path.resolve(
    WORKING_DIRECTORY,
    mock === undefined ? getInput("eslint-path") : "node_modules/.bin/eslint"
  );
  if (!existsSync(eslintBinPath)) {
    throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
  }
  let stdout = "";
  let stderr = "";
  info(`Using ESLint binary from: ${eslintBinPath}`);
  try {
    await exec(eslintBinPath, [".", "--format", "json"], {
      listeners: {
        stdout: (data: Buffer) => {
          stdout += data.toString();
        },
        stderr: (data: Buffer) => {
          stderr += data.toString();
        },
      },
    });
  } catch (error) {}
  const results = JSON.parse(stdout);

  const IndexedResults: {
    [file: string]: {
      filePath: string;
      source: string;
      messages: {
        severity: number;
        line: number;
        endLine: number;
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
  const eslintRules: {
    [name: string]: { docs?: { description?: string; url?: string } };
  } = eslint.getRulesMetaForResults(results);
  endGroup();

  startGroup("GitHub Pull Request");
  const githubToken = mock?.token || getInput("github-token");
  const Octokit = GitHub.plugin(throttling, retry);
  const octokit = new Octokit(
    getOctokitOptions(githubToken, {
      throttle: {
        onRateLimit: (
          retryAfter: number,
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          }
        ) => {
          if (options.request.retryCount === 0) {
            octokit.log.warn(
              `Request quota exhausted for request ${options.method} ${options.url}`
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.error(
              `Request quota exhausted for request ${options.method} ${options.url}`
            );
          }
        },
        onSecondaryRateLimit: (
          retryAfter: number,
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          }
        ) => {
          if (options.request.retryCount === 0) {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`
            );
          }
        },
      },
      retry: {
        doNotRetry: ["429"],
      },
    })
  );
  octokit.rest.rateLimit;

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
    info(`  File status: ${file.status}`);
    if (file.status === "removed") {
      continue;
    }

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
      for (const message of result.messages) {
        const rule = eslintRules[message.ruleId];
        if (
          !suppressAnnotations &&
          (indexedModifiedLines[message.line] || outOfScopeAnnotations)
        ) {
          if (indexedModifiedLines[message.line]) {
            info(
              `  Annotation: ${message.line}:${message.column}-${message.endLine}:${message.endColumn}`
            );
          } else {
            info(
              `  Out-of-scope annotation: ${message.line}:${message.column}-${message.endLine}:${message.endColumn}`
            );
          }
          switch (message.severity) {
            case 0:
              notice(`${message.message} (${message.ruleId})`);
              notice(`${rule?.docs?.description}\n${rule?.docs?.url}`, {
                file: file.filename,
                startLine: message.line,
                endLine:
                  message.line === message.endLine
                    ? undefined
                    : message.endLine,
                startColumn: message.column,
                endColumn: message.endColumn,
                title: `${message.message} (${message.ruleId})`,
              });
              break;
            case 1:
              warning(`${message.message} (${message.ruleId})`);
              warning(`${rule?.docs?.description}\n${rule?.docs?.url}`, {
                file: file.filename,
                startLine: message.line,
                endLine:
                  message.line === message.endLine
                    ? undefined
                    : message.endLine,
                startColumn: message.column,
                endColumn: message.endColumn,
                title: `${message.message} (${message.ruleId})`,
              });
              break;
            case 2:
              error(`${message.message} (${message.ruleId})`);
              error(`${rule?.docs?.description}\n${rule?.docs?.url}`, {
                file: file.filename,
                startLine: message.line,
                endLine:
                  message.line === message.endLine
                    ? undefined
                    : message.endLine,
                startColumn: message.column,
                endColumn: message.endColumn,
                title: `${message.message} (${message.ruleId})`,
              });
              break;
            default:
              throw new Error(`Unrecognized severity: ${message.severity}`);
          }
        }
        if (indexedModifiedLines[message.line]) {
          info(`  Matched line: ${message.line}`);
          if (message.fix && !suppressFixes) {
            const textRange = result.source.substring(
              message.fix.range[0],
              message.fix.range[1]
            );
            const impactedOriginalLines = textRange.split("\n").length;
            const originalLines = result.source
              .split("\n")
              .slice(
                message.line - 1,
                message.line - 1 + impactedOriginalLines
              );
            const replacedSource =
              result.source.substring(0, message.fix.range[0]) +
              message.fix.text +
              result.source.substring(message.fix.range[1]);
            const impactedReplaceLines = message.fix.text.split("\n").length;
            const replacedLines = replacedSource
              .split("\n")
              .slice(message.line - 1, message.line - 1 + impactedReplaceLines);
            info(
              "    Fix:\n" +
                "      " +
                `@@ -${message.line},${impactedOriginalLines} +${impactedReplaceLines} @@\n` +
                `${originalLines
                  .map((line) => "      - " + line)
                  .join("\n")}\n` +
                `${replacedLines.map((line) => "      + " + line).join("\n")}`
            );
            const response = await octokit.rest.pulls.createReviewComment({
              owner,
              repo,
              body:
                `[${rule?.docs?.description}](${rule?.docs?.url}). Fix available:\n\n` +
                "```suggestion\n" +
                `${replacedLines.join("\n")}\n` +
                "```\n",
              pull_number: pullRequest.number,
              commit_id: headSha,
              path: file.filename,
              start_side:
                message.line === message.line + impactedOriginalLines - 1
                  ? undefined
                  : "RIGHT",
              start_line:
                message.line === message.line + impactedOriginalLines - 1
                  ? undefined
                  : message.line,
              side: "RIGHT",
              line: message.line + impactedOriginalLines - 1,
            });
            info(`      Commented`);
          }
          if (message.suggestions && !suppressSuggestions) {
            const source = result.source.split("\n");
            const sourceLineLengths = source.map((line) => line.length + 1);
            const beforeSourceLength = sourceLineLengths
              .slice(0, message.line - 1)
              .reduce((previous, current) => previous + current, 0);
            const suggestionBlocks = [];
            for (const suggestion of message.suggestions) {
              const replaceIndexStart =
                suggestion.fix.range[0] - beforeSourceLength;
              const replaceIndexEnd =
                suggestion.fix.range[1] - beforeSourceLength;
              const originalLine = source[message.line - 1];
              const replacedLine =
                originalLine.substring(0, replaceIndexStart) +
                suggestion.fix.text +
                originalLine.substring(replaceIndexEnd);
              suggestionBlocks.push(
                `${suggestion.desc} (${suggestion.messageId})\n\n` +
                  "```suggestion\n" +
                  `${replacedLine}\n` +
                  "```\n"
              );
              info(
                "    Suggestion:\n" +
                  "      " +
                  `${originalLine} => ${replacedLine} @ ${message.line}`.trim()
              );
            }
            const response = await octokit.rest.pulls.createReviewComment({
              owner,
              repo,
              body:
                `[${rule?.docs?.description}](${rule?.docs?.url}). Suggestion(s) available:\n\n` +
                suggestionBlocks.join("\n"),
              pull_number: pullRequest.number,
              commit_id: headSha,
              path: file.filename,
              side: "RIGHT",
              line: message.line,
            });
            info(`    Commented`);
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
