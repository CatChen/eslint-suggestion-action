import type { ESLint } from 'eslint';
import { sync } from 'glob';

export async function getESLintResults(eslint: ESLint, targets: string) {
  return eslint.lintFiles(targets ? sync(targets) : []);
}
