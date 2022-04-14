import github from "@actions/github";
import core from "@actions/core";
import { PullRequest } from "@octokit/webhooks-definitions/schema";

async function run() {
  const githubToken = core.getInput("github-token");
  const octokit = github.getOctokit(githubToken);
  const context = github.context;
  const pullRequest = context.payload.pull_request as PullRequest;
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;
  await octokit.rest.pulls.createReviewComment({
    ...context.repo,
    body: "Test comment from action",
    pull_number: pullRequest.number,
    commit_id: headSha,
  });
}

run();
