import { createRequire } from 'module';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getInput, notice } from '@actions/core';
import { DEFAULT_WORKING_DIRECTORY } from './changeDirectory';

export async function getESLint() {
  const absoluteDirectory = resolve(
    DEFAULT_WORKING_DIRECTORY,
    getInput('directory'),
  );
  const require = createRequire(absoluteDirectory);
  const eslintJsPath = resolve(absoluteDirectory, getInput('eslint-lib-path'));
  if (!existsSync(eslintJsPath)) {
    throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
  }
  notice(`Using ESLint from: ${eslintJsPath}`);
  const { ESLint } = require(eslintJsPath);
  const eslintConfig = await new ESLint().calculateConfigForFile(
    'package.json',
  );
  const eslint = new ESLint({ baseConfig: eslintConfig });

  const eslintBinPath = getInput('eslint-bin-path');
  if (!existsSync(eslintBinPath)) {
    throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
  }
  notice(`Using ESLint binary from: ${eslintBinPath}`);

  return { eslint, eslintBinPath };
}
