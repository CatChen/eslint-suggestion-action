import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

const jsConfigs = compat.config({
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  rules: {},
  ignorePatterns: [
    'tests/**/*',
    'node_modules/**/*',
    'dist/**/*',
    'bundle/**/*',
  ],
});

const tsConfigs = [
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
].map((config) => ({
  ...config,
  files: ['src/**/*.ts', 'src/**/*.js'],
}));

const configs = ts.config(...jsConfigs, ...tsConfigs);

export default configs;
