import { getOctokit, context } from "@actions/github";
import { getInput, info } from "@actions/core";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import process from "node:process";

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
