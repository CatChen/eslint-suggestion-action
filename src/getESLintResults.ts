import type { ESLint } from 'eslint';
import { getInput } from '@actions/core';
import { sync } from 'glob';

export async function getESLintResults(eslint: ESLint) {
  const targets = getInput('targets');
  return eslint.lintFiles(targets ? sync(targets) : []);
}
