declare type DiffEntry = import("@octokit/openapi-types/types").components["schemas"]["diff-entry"];
export declare function getIndexedModifiedLines(file: DiffEntry): {
    [line: string]: true;
};
export {};
