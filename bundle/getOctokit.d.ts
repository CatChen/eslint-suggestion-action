import { type Octokit } from '@octokit/core/dist-types/index.js';
import { type PaginateInterface } from '@octokit/plugin-paginate-rest';
import { type Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types.js';
export declare function getOctokit(githubToken: string): Octokit & Api & {
    paginate: PaginateInterface;
};
