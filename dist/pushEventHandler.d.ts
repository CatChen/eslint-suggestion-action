declare type Octokit = import("@octokit/core").Octokit;
declare type Api = import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api;
declare type LintResult = import("eslint").ESLint.LintResult;
declare type RuleMetaData = import("eslint").Rule.RuleMetaData;
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
export declare function pushEventHandler(indexedResults: {
    [file: string]: LintResult;
}, ruleMetaDatas: {
    [name: string]: RuleMetaData;
}): Promise<void>;
export {};
