"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPullRequestMetadataByNumber = exports.getPullRequestMetadata = void 0;
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const getOctokit_1 = require("./getOctokit");
function getPullRequestMetadata() {
    const pullRequest = github_1.context.payload.pull_request;
    const owner = github_1.context.repo.owner;
    const repo = github_1.context.repo.repo;
    const pullRequestNumber = pullRequest.number;
    const baseSha = pullRequest.base.sha;
    const headSha = pullRequest.head.sha;
    (0, core_1.info)(`Owner: ${owner}`);
    (0, core_1.info)(`Repo: ${repo}`);
    (0, core_1.info)(`Pull Request number: ${pullRequestNumber}`);
    (0, core_1.info)(`Base SHA: ${baseSha}`);
    (0, core_1.info)(`Head SHA: ${headSha}`);
    return {
        owner,
        repo,
        pullRequestNumber,
        baseSha,
        headSha,
    };
}
exports.getPullRequestMetadata = getPullRequestMetadata;
async function getPullRequestMetadataByNumber(pullRequestNumber) {
    const octokit = (0, getOctokit_1.getOctokit)();
    const owner = github_1.context.repo.owner;
    const repo = github_1.context.repo.repo;
    const response = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: pullRequestNumber,
    });
    const pullRequest = response.data;
    const baseSha = pullRequest.base.sha;
    const headSha = pullRequest.head.sha;
    (0, core_1.info)(`Owner: ${owner}`);
    (0, core_1.info)(`Repo: ${repo}`);
    (0, core_1.info)(`Pull Request number: ${pullRequestNumber}`);
    (0, core_1.info)(`Base SHA: ${baseSha}`);
    (0, core_1.info)(`Head SHA: ${headSha}`);
    return {
        owner,
        repo,
        pullRequestNumber,
        baseSha,
        headSha,
    };
}
exports.getPullRequestMetadataByNumber = getPullRequestMetadataByNumber;
