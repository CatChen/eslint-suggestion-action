import { getOctokit, context } from "@actions/github";
import { getInput, info } from "@actions/core";
import { exec } from "@actions/exec";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import process from "node:process";
import path from "node:path";

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
  let stdout = "";
  let stderr = "";
  try {
    await exec("yarn -s eslint ./src --format json", [], {
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

  for (const file of results) {
    info(`File name: ${path.relative(WORKING_DIRECTORY, file.filePath)}`);
    for (const message of file.messages) {
      console.log(message);
    }
  }

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
          }
          currentLine++;
          remainingLinesInHunk--;
        }
      }
    }

    info(`File modified lines: ${modifiedLines.join()}`);
    info(`File patch: \n${file.patch}\n`);

    // const response = await octokit.rest.pulls.createReviewComment({
    //   owner,
    //   repo,
    //   body: `Test comment from action for ${file.filename}`,
    //   pull_number: pullRequest.number,
    //   commit_id: headSha,
    //   path: file.filename,
    //   position: 1,
    // });
    // info(
    //   `Made test comment for ${file.filename} as ${response.data.pull_request_review_id}`
    // );
  }
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
