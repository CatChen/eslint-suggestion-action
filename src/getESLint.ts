import type { ESLint as ProjectESLint } from 'eslint';
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
  const { ESLint, loadESLint } = require(eslintJsPath) as {
    ESLint: typeof ProjectESLint;
    loadESLint: (() => Promise<typeof ProjectESLint>) | undefined;
  };
  notice(`ESLint version: ${ESLint.version}`);

  const configPath = getInput('config-path');
  if (configPath) {
    const absoluteConfigPath = resolve(absoluteDirectory, configPath);
    notice(`Using ESLint config from: ${absoluteConfigPath}`);
    const eslint = new ESLint({ overrideConfigFile: absoluteConfigPath });
    return eslint;
  }

  if (loadESLint) {
    // ESLint 8.57.0 and later
    notice('Using ESLint with default configuration');
    const eslint = new (await loadESLint())();
    return eslint;
  }

  const eslintConfig = (await new ESLint().calculateConfigForFile(
    'package.json',
  )) as ProjectESLint.ConfigData | undefined;
  if (!eslintConfig) {
    throw new Error(
      'Failed to find ESLint configuration. Please set the config-path input.',
    );
  }
  const eslint = new ESLint({ baseConfig: eslintConfig });
  return eslint;
}
