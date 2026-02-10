import type { Octokit } from '@octokit/core';
import type { PaginateInterface } from '@octokit/plugin-paginate-rest';
import type { Api } from '@octokit/plugin-rest-endpoint-methods';
export declare function getOctokit(githubToken: string): Octokit & Api & {
    paginate: PaginateInterface;
};
