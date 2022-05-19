import { Octokit } from "@octokit/core";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { components } from "@octokit/openapi-types/types";
declare type Fix = import("eslint").Rule.Fix;
declare type MockConfig = {
    token: string;
    owner: string;
    repo: string;
    number: number;
};
declare type ReviewSuggestion = {
    start_side: "RIGHT" | undefined;
    start_line: number | undefined;
    side: "RIGHT";
    line: number;
    body: string;
};
export declare function getESLint(mock: MockConfig | undefined): Promise<{
    eslint: any;
    eslintBinPath: string;
}>;
export declare function getESLintOutput(eslintBinPath: string): Promise<import("eslint").ESLint.LintResult[]>;
export declare function getOctokit(mock: MockConfig | undefined): Octokit & Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
} & {
    retry: {
        retryRequest: (error: import("@octokit/request-error").RequestError, retries: number, retryAfter: number) => import("@octokit/request-error").RequestError;
    };
};
export declare function getPullRequestMetadata(mock: MockConfig | undefined, octokit: Octokit & Api): Promise<{
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
}>;
export declare function getPullRequestFiles(owner: string, repo: string, pullRequestNumber: number, octokit: Octokit & Api): Promise<{
    sha: string;
    filename: string;
    status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch?: string | undefined;
    previous_filename?: string | undefined;
}[]>;
export declare function getIndexedModifiedLines(file: components["schemas"]["diff-entry"]): {
    [line: string]: true;
};
export declare function getCommentFromFix(source: string, line: number, fix: Fix): ReviewSuggestion;
export declare function run(mock?: MockConfig | undefined): Promise<void>;
export {};
