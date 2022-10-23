import { context } from "@actions/github";
import { info } from "@actions/core";

import type { PullRequestEvent } from "@octokit/webhooks-definitions/schema";

export async function getPullRequestMetadata() {
  const pullRequest = (context.payload as PullRequestEvent).pull_request;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const pullRequestNumber = pullRequest.number;
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;

  info(`Owner: ${owner}`);
  info(`Repo: ${repo}`);
  info(`Pull Request number: ${pullRequestNumber}`);
  info(`Base SHA: ${baseSha}`);
  info(`Head SHA: ${headSha}`);

  return {
    owner,
    repo,
    pullRequestNumber,
    baseSha,
    headSha,
  };
}
