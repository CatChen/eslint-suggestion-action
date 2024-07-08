import type { Octokit } from '@octokit/core';
import type { components } from '@octokit/openapi-types/types.js';
import type { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types.js';
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
export declare function getCommentFromFix(source: string, line: number, fix: Rule.Fix): ReviewSuggestion;
export declare function matchReviewComments(reviewComments: Pick<components['schemas']['review-comment'], 'path' | 'line' | 'side' | 'start_line' | 'start_side' | 'body' | 'node_id'>[], reviewComment: ReviewComment): string[];
export declare function handlePullRequest(octokit: Octokit & Api, indexedResults: {
    [file: string]: ESLint.LintResult;
}, ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}, owner: string, repo: string, pullRequestNumber: number, baseSha: string, headSha: string): Promise<void>;
export {};
