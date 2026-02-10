import type { Octokit } from '@octokit/core';
import type { PaginateInterface } from '@octokit/plugin-paginate-rest';
import type { Api } from '@octokit/plugin-rest-endpoint-methods';
import type { EndpointDefaults } from '@octokit/types';
import { GitHub, getOctokitOptions } from '@actions/github/lib/utils';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

export function getOctokit(githubToken: string): Octokit &
  Api & {
    paginate: PaginateInterface;
  } {
  const Octokit = GitHub.plugin(throttling, retry);
  const octokit = new Octokit(
    getOctokitOptions(githubToken, {
      throttle: {
        onRateLimit: (
          retryAfter: number,
          options: Required<EndpointDefaults>,
          _: Octokit,
          retryCount: number,
        ) => {
          if (retryCount === 0) {
            octokit.log.warn(
              `Request quota exhausted for request ${options.method} ${options.url}`,
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.error(
              `Request quota exhausted for request ${options.method} ${options.url}`,
            );
          }
        },
        onSecondaryRateLimit: (
          retryAfter: number,
          options: Required<EndpointDefaults>,
          _: Octokit,
          retryCount: number,
        ) => {
          if (retryCount === 0) {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`,
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`,
            );
          }
        },
      },
      retry: {
        doNotRetry: ['429'],
      },
    }),
  );
  octokit.graphql = octokit.graphql.defaults({
    headers: {
      'X-GitHub-Next-Global-ID': 1,
    },
  });
  return octokit;
}
