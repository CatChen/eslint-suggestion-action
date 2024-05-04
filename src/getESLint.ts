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
  const { ESLint, loadESLint } = require(eslintJsPath);
  notice(`ESLint version: ${ESLint.version}`);
  const eslint = new (await loadESLint())();
  return eslint;
}
