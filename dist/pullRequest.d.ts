import type { Octokit } from '@octokit/core';
import type { PullRequestReviewThread } from '@octokit/graphql-schema';
import type { components } from '@octokit/openapi-types/types';
import type { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types';
import type { ESLint, Rule } from 'eslint';
type ReviewSuggestion = {
    start_side?: 'RIGHT';
    start_line?: number;
    side: 'RIGHT';
    line: number;
    body: string;
};
type ReviewComment = ReviewSuggestion & {
    path: string;
};
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
    patch?: string;
    previous_filename?: string;
}[]>;
export declare function getReviewComments(owner: string, repo: string, pullRequestNumber: number, octokit: Octokit & Api): Promise<{
    url: string;
    pull_request_review_id: number | null;
    id: number;
    node_id: string;
    diff_hunk: string;
    path: string;
    position?: number;
    original_position?: number;
    commit_id: string;
    original_commit_id: string;
    in_reply_to_id?: number;
    user: components["schemas"]["simple-user"];
    body: string;
    created_at: string;
    updated_at: string;
    html_url: string;
    pull_request_url: string;
    author_association: components["schemas"]["author-association"];
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
    start_line?: number | null;
    original_start_line?: number | null;
    start_side?: "LEFT" | "RIGHT" | null;
    line?: number;
    original_line?: number;
    side?: "LEFT" | "RIGHT";
    subject_type?: "line" | "file";
    reactions?: components["schemas"]["reaction-rollup"];
    body_html?: string;
    body_text?: string;
}[]>;
export declare function getReviewThreads(owner: string, repo: string, pullRequestNumber: number, octokit: Octokit & Api): Promise<{
    [id: string]: PullRequestReviewThread;
}>;
export declare function getCommentFromFix(source: string, line: number, fix: Rule.Fix): ReviewSuggestion;
export declare function matchReviewComments(reviewComments: Pick<components['schemas']['review-comment'], 'path' | 'line' | 'side' | 'start_line' | 'start_side' | 'body' | 'node_id'>[], reviewComment: ReviewComment): string[];
export declare function handlePullRequest(indexedResults: {
    [file: string]: ESLint.LintResult;
}, ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}, owner: string, repo: string, pullRequestNumber: number, baseSha: string, headSha: string): Promise<void>;
export {};
