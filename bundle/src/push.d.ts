import type { Octokit } from '@octokit/core';
import type { Api } from '@octokit/plugin-rest-endpoint-methods/dist-types/types.js';
import type { ESLint, Rule } from 'eslint';
export declare function handlePush(octokit: Octokit & Api, indexedResults: {
    [file: string]: ESLint.LintResult;
}, ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}, owner: string, repo: string, beforeSha: string, afterSha: string): Promise<void>;
