import { getOctokit, context } from "@actions/github";
import { getInput, info } from "@actions/core";
import { PullRequest } from "@octokit/webhooks-definitions/schema";

async function run() {
  const githubToken = getInput("github-token");
  const octokit = getOctokit(githubToken);
  const pullRequest = context.payload.pull_request as PullRequest;
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;
  info(`Repo: ${context.repo.repo}`);
  info(`Owner: ${context.repo.owner}`);
  info(`Pull request number: ${pullRequest.number}`);
  info(`Base SHA: ${baseSha}`);
  info(`Head SHA: ${headSha}`);
  info(`Diff hunk: ${pullRequest}`);

  const files = await octokit.rest.pulls.listFiles({
    ...context.repo,
    pull_number: pullRequest.number,
  });
  info(`Files: ${files.data.length}`);
  files.data.forEach((file) => {
    info(`File name: ${file.filename}`);
  });

  await octokit.rest.pulls.createReviewComment({
    ...context.repo,
    body: "Test comment from action",
    pull_number: pullRequest.number,
    commit_id: headSha,
  });
}

run();
