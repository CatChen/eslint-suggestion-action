import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';
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
      'eslint.config.js',
      'codegen.ts',
      'schema.graphql',
      'src/__graphql__/**',
    ],
    overrides: [
      {
        files: ['*.ts'],
      },
    ],
  }),
  // Keep TypeScript linting active while extracting GraphQL documents from .ts files.
  ...ts.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.ts'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        ...config.languageOptions?.parserOptions,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    processor: graphqlPlugin.processor,
  })),
  // Lint extracted GraphQL operations against the generated schema.
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
      parserOptions: {
        graphQLConfig: {
          schema: './schema.graphql',
          documents: ['src/**/*.ts', '!src/__graphql__/**', '!**/*.d.ts'],
        },
      },
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: graphqlPlugin.configs['flat/operations-recommended'].rules,
  },
);
