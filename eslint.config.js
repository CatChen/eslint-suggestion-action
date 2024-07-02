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

export default ts.config(
  ...compat.config({
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    root: true,
    rules: {},
    ignorePatterns: [
      'node_modules/**/*',
      'dist/**/*',
      'bundle/**/*',
      'eslint.config.js',
    ],
    overrides: [
      {
        files: ['*.ts'],
      },
    ],
  }),
  ...ts.configs.recommendedTypeChecked,
);
