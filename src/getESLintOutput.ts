import type { ESLint } from 'eslint';
import { getInput, info } from '@actions/core';
import { getExecOutput } from '@actions/exec';
import { sync } from 'glob';

export async function getESLintOutput(eslintBinPath: string) {
  const targets = getInput('targets');
  const eslintOutput = await getExecOutput(
    eslintBinPath,
    [...sync(targets), '--no-error-on-unmatched-pattern', '--format', 'json'],
    { ignoreReturnCode: true },
  );

  // eslintOutput.exitCode !== ExitCode.Success when there is any ESLint warning or error.
  // Swallow this kind of error and parse the JSON that represents the warnings and errors.
  info(`ESLint exit code: ${eslintOutput.exitCode}`);

  const results: ESLint.LintResult[] = JSON.parse(eslintOutput.stdout);
  return results;
}
