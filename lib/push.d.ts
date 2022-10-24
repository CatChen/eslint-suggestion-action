import type { Octokit } from "@octokit/core";
import type { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import type { ESLint, Rule } from "eslint";
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
export declare function handlePush(indexedResults: {
    [file: string]: ESLint.LintResult;
}, ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}, owner: string, repo: string, beforeSha: string, afterSha: string): Promise<void>;
