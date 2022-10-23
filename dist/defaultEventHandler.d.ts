import type { ESLint, Rule } from "eslint";
export declare function defaultEventHandler(eventName: string, results: ESLint.LintResult[], ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
}): Promise<void>;
