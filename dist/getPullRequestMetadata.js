import { info } from '@actions/core';
import { context } from '@actions/github';
export function getPullRequestMetadata() {
    const pullRequest = context.payload.pull_request;
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
export async function getPullRequestMetadataByNumber(octokit, pullRequestNumber) {
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const response = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: pullRequestNumber,
    });
    const pullRequest = response.data;
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
