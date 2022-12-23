import { info } from '@actions/core';
import { context } from '@actions/github';
import { PushEvent } from '@octokit/webhooks-definitions/schema';

export async function getPushMetadata() {
  const push = context.payload as PushEvent;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const beforeSha = push.before;
  const afterSha = push.after;

  info(`Owner: ${owner}`);
  info(`Repo: ${repo}`);
  info(`Before SHA: ${beforeSha}`);
  info(`After SHA: ${afterSha}`);

  return {
    owner,
    repo,
    beforeSha,
    afterSha,
  };
}
