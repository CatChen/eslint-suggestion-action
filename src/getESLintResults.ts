import type { ESLint } from 'eslint';
import { globSync } from 'glob';

export async function getESLintResults(eslint: ESLint, targets: string) {
  return eslint.lintFiles(targets ? globSync(targets) : []);
}
