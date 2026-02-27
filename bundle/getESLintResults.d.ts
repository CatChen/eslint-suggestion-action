import type { ESLint } from 'eslint';
export declare function getESLintResults(eslint: ESLint, targets: string): Promise<ESLint.LintResult[]>;
