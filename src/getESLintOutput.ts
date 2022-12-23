import type { ESLint } from 'eslint';
import { ExitCode, getInput } from '@actions/core';
import { getExecOutput } from '@actions/exec';
import { sync } from 'glob';

export async function getESLintOutput(eslintBinPath: string) {
  const targets = getInput('targets');
  const eslintOutput = await getExecOutput(eslintBinPath, [
    ...sync(targets),
    '--no-error-on-unmatched-pattern',
    '--format',
    'json',
  ]);
  if (eslintOutput.exitCode !== ExitCode.Success) {
    throw new Error(eslintOutput.stderr);
  }
  const results: ESLint.LintResult[] = JSON.parse(eslintOutput.stdout);
  return results;
}
