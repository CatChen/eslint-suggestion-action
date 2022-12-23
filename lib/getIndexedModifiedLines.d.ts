import type { components } from '@octokit/openapi-types/types';
export declare function getIndexedModifiedLines(file: components['schemas']['diff-entry']): {
    [line: string]: true;
};
