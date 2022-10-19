import { Octokit } from "@octokit/core";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { components } from "@octokit/openapi-types/types";
import { PullRequestReviewThread } from "@octokit/graphql-schema";
declare type LintResult = import("eslint").ESLint.LintResult;
declare type RuleMetaData = import("eslint").Rule.RuleMetaData;
declare type Fix = import("eslint").Rule.Fix;
declare type MockConfig = {
    token: string;
    owner: string;
    repo: string;
    number: number;
};
declare type ReviewSuggestion = {
    start_side?: "RIGHT";
    start_line?: number;
    side: "RIGHT";
    line: number;
    body: string;
};
declare type ReviewComment = ReviewSuggestion & {
    path: string;
};
export declare function changeDirectory(mock: MockConfig | undefined): void;
export declare function getESLint(mock: MockConfig | undefined): Promise<{
    eslint: any;
    eslintBinPath: string;
}>;
export declare function getESLintOutput(mock: MockConfig | undefined, eslintBinPath: string): Promise<import("eslint").ESLint.LintResult[]>;
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
export declare function getReviewComments(owner: string, repo: string, pullRequestNumber: number, octokit: Octokit & Api): Promise<{
    url: string;
    pull_request_review_id: number | null;
    id: number;
    node_id: string;
    diff_hunk: string;
    path: string;
    position: number;
    original_position: number;
    commit_id: string;
    original_commit_id: string;
    in_reply_to_id?: number | undefined;
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string | undefined;
    };
    body: string;
    created_at: string;
    updated_at: string;
    html_url: string;
    pull_request_url: string;
    author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    _links: {
        self: {
            href: string;
        };
        html: {
            href: string;
        };
        pull_request: {
            href: string;
        };
    };
    start_line?: number | null | undefined;
    original_start_line?: number | null | undefined;
    start_side?: "RIGHT" | "LEFT" | null | undefined;
    line?: number | undefined;
    original_line?: number | undefined;
    side?: "RIGHT" | "LEFT" | undefined;
    reactions?: {
        url: string;
        total_count: number;
        "+1": number;
        "-1": number;
        laugh: number;
        confused: number;
        heart: number;
        hooray: number;
        eyes: number;
        rocket: number;
    } | undefined;
    body_html?: string | undefined;
    body_text?: string | undefined;
}[]>;
export declare function getReviewThreads(owner: string, repo: string, pullRequestNumber: number, octokit: Octokit & Api): Promise<{
    [id: string]: PullRequestReviewThread;
}>;
export declare function getIndexedModifiedLines(file: components["schemas"]["diff-entry"]): {
    [line: string]: true;
};
export declare function getCommentFromFix(source: string, line: number, fix: Fix): ReviewSuggestion;
export declare function matchReviewComments(reviewComments: components["schemas"]["review-comment"][], reviewComment: ReviewComment): string[];
export declare function pullRequestEventHandler(mock: MockConfig | undefined, indexedResults: {
    [file: string]: LintResult;
}, ruleMetaDatas: {
    [name: string]: RuleMetaData;
}): Promise<void>;
export declare function getPushMetadata(mock: MockConfig | undefined): Promise<{
    owner: string;
    repo: string;
    beforeSha: string;
    afterSha: string;
}>;
export declare function getPushFiles(owner: string, repo: string, beforeSha: string, afterSha: string, octokit: Octokit & Api): Promise<{
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
}[] | undefined>;
export declare function pushEventHandler(mock: MockConfig | undefined, indexedResults: {
    [file: string]: LintResult;
}, ruleMetaDatas: {
    [name: string]: RuleMetaData;
}): Promise<void>;
export declare function defaultEventHandler(mock: MockConfig | undefined, eventName: string, results: LintResult[], ruleMetaDatas: {
    [name: string]: RuleMetaData;
}): Promise<void>;
export declare function run(mock?: MockConfig | undefined): Promise<void>;
export {};
