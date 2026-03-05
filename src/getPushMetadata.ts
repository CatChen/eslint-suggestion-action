import type { PushEvent } from '@octokit/webhooks-types';
import { info } from '@actions/core';
import { context } from '@actions/github';

export function getPushMetadata() {
  const push = context.payload as PushEvent;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const beforeSha = push.before;
  const afterSha = push.after;
  const created = push.created;
  const deleted = push.deleted;

  info(`Owner: ${owner}`);
  info(`Repo: ${repo}`);
  info(`Before SHA: ${beforeSha}`);
  info(`After SHA: ${afterSha}`);
  info(`Created: ${created}`);
  info(`Deleted: ${deleted}`);

  return {
    owner,
    repo,
    beforeSha,
    afterSha,
    created,
    deleted,
  };
}
