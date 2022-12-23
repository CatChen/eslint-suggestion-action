import { getInput } from '@actions/core';
import { GitHub, getOctokitOptions } from '@actions/github/lib/utils';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

export function getOctokit() {
  const githubToken = getInput('github-token');
  const Octokit = GitHub.plugin(throttling, retry);
  const octokit = new Octokit(
    getOctokitOptions(githubToken, {
      throttle: {
        onRateLimit: (
          retryAfter: number,
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          },
        ) => {
          if (options.request.retryCount === 0) {
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
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          },
        ) => {
          if (options.request.retryCount === 0) {
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
  return octokit;
}
