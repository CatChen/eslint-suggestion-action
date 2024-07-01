import type { Octokit } from '@octokit/core';
import type { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types.js';
export declare function getPullRequestMetadata(): {
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
};
export declare function getPullRequestMetadataByNumber(octokit: Octokit & Api, pullRequestNumber: number): Promise<{
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
}>;
