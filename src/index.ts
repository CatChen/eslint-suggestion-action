import github from "@actions/github";
import core from "@actions/core";
import { PullRequest } from "@octokit/webhooks-definitions/schema";

async function run() {
  // PR base commit
  // PR last commit
  const githubToken = core.getInput("github-token");
  const octokit = github.getOctokit(githubToken);
  const pullRequest = github.context.payload.pull_request as PullRequest;
  const pullRequestUrl = pullRequest.url;
}

run();
