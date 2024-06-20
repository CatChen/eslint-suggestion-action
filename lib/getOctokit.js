"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOctokit = getOctokit;
const core_1 = require("@actions/core");
const utils_1 = require("@actions/github/lib/utils");
const plugin_retry_1 = require("@octokit/plugin-retry");
const plugin_throttling_1 = require("@octokit/plugin-throttling");
function getOctokit() {
    const githubToken = (0, core_1.getInput)('github-token');
    const Octokit = utils_1.GitHub.plugin(plugin_throttling_1.throttling, plugin_retry_1.retry);
    const octokit = new Octokit((0, utils_1.getOctokitOptions)(githubToken, {
        throttle: {
            onRateLimit: (retryAfter, options, _, retryCount) => {
                if (retryCount === 0) {
                    octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
                    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
                else {
                    octokit.log.error(`Request quota exhausted for request ${options.method} ${options.url}`);
                }
            },
            onSecondaryRateLimit: (retryAfter, options, _, retryCount) => {
                if (retryCount === 0) {
                    octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
                    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
                else {
                    octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
                }
            },
        },
        retry: {
            doNotRetry: ['429'],
        },
    }));
    return octokit;
}
