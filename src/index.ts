import { getOctokit, context } from "@actions/github";
import { getInput, info, startGroup, endGroup } from "@actions/core";
import { exec } from "@actions/exec";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import process from "node:process";
import path from "node:path";
import { existsSync } from "node:fs";

const HUNK_HEADER_PATTERN = /^@@ \-\d+,\d+ \+(\d+),(\d+) @@/;
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
  console.log(path.resolve(WORKING_DIRECTORY, eslintPath));
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
        line: number;
        message: string;
        ruleId: string;
        fix: { range: number[]; text: string };
      }[];
    };
  } = {};
  for (const file of results) {
    const relativePath = path.relative(WORKING_DIRECTORY, file.filePath);
    info(`File name: ${relativePath}`);
    IndexedResults[relativePath] = file;
    for (const message of file.messages) {
      info(`${message.message} @ ${message.line}`);
    }
  }
  endGroup();

  startGroup("GitHub Comment");
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
  info(`Files: ${response.data.length}`);
  for (const file of response.data) {
    info(`File name: ${file.filename}`);
    info(`File state: ${file.status}`);

    const modifiedLines = [];
    const indexedModifiedLines: { [line: string]: true } = {};
    let currentLine = 0;
    let remainingLinesInHunk = 0;
    const lines = file.patch?.split("\n");
    if (lines) {
      for (const line of lines) {
        if (remainingLinesInHunk === 0) {
          const matches = line.match(HUNK_HEADER_PATTERN);
          currentLine = parseInt(matches?.[1] || "0");
          remainingLinesInHunk = parseInt(matches?.[2] || "0");
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

    info(`File modified lines: ${modifiedLines.join()}`);
    info(`File patch: \n${file.patch}\n`);

    const result = IndexedResults[file.filename];
    if (result) {
      const source = result.source.split("\n");
      const sourceLineLengths = source.map((line) => line.length);
      for (const message of result.messages) {
        console.log(message.line, indexedModifiedLines[message.line]);
        if (indexedModifiedLines[message.line]) {
          info(`Line matched: ${message.line}`);
          if (message.fix) {
            const beforeSourceLength = sourceLineLengths
              .slice(0, message.line)
              .reduce((previous, current) => previous + current, 0);
            const replaceIndexStart = message.fix.range[0];
            const replaceIndexEnd = message.fix.range[1];
            const originalLine = source[message.line - 1];
            const replacedLine =
              originalLine.substring(0, replaceIndexStart) +
              message.fix.text +
              originalLine.substring(replaceIndexEnd);
            info(`Suggestion:\n${originalLine} => ${replacedLine}`);
            const response = await octokit.rest.pulls.createReviewComment({
              owner,
              repo,
              body: `${message.message} (${message.ruleId})

\`\`\`suggestion
${replacedLine}
\`\`\``,
              pull_number: pullRequest.number,
              commit_id: headSha,
              path: file.filename,
              position: 1,
            });
            info(
              `Commented in ${file.filename}:${message.line} with ${message.ruleId} plus fix`
            );
          } else {
            const response = await octokit.rest.pulls.createReviewComment({
              owner,
              repo,
              body: `${message.message} (${message.ruleId})`,
              pull_number: pullRequest.number,
              commit_id: headSha,
              path: file.filename,
              position: 1,
            });
            info(
              `Commented in ${file.filename}:${message.line} with ${message.ruleId}`
            );
          }
        }
      }
    }
  }
  endGroup();
}

console.log(process.argv);
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
