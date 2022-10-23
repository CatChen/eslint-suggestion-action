declare type LintResult = import("eslint").ESLint.LintResult;
declare type RuleMetaData = import("eslint").Rule.RuleMetaData;
export declare function changeDirectory(): void;
export declare function defaultEventHandler(eventName: string, results: LintResult[], ruleMetaDatas: {
    [name: string]: RuleMetaData;
}): Promise<void>;
export declare function run(): Promise<void>;
export {};
