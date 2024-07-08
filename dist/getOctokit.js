"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOctokit = getOctokit;
const utils_js_1 = require("@actions/github/lib/utils.js");
const plugin_retry_1 = require("@octokit/plugin-retry");
const plugin_throttling_1 = require("@octokit/plugin-throttling");
function getOctokit(githubToken) {
    const Octokit = utils_js_1.GitHub.plugin(plugin_throttling_1.throttling, plugin_retry_1.retry);
    const octokit = new Octokit((0, utils_js_1.getOctokitOptions)(githubToken, {
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
    octokit.graphql = octokit.graphql.defaults({
        headers: {
            'X-GitHub-Next-Global-ID': 1,
        },
    });
    return octokit;
}
