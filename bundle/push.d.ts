import type { ESLint, Rule } from 'eslint';
export declare function handlePush(indexedResults: {
    [file: string]: ESLint.LintResult;
}, ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}, beforeSha: string, afterSha: string, created: boolean, deleted: boolean, failCheck: boolean): Promise<void>;
