import type { ESLint } from 'eslint';
export declare function getESLintOutput(eslintBinPath: string): Promise<ESLint.LintResult[]>;
