# eslint-suggestion-action

[![Build](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/build.yml/badge.svg?branch=main&event=push)](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/build.yml)
[![Test](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/test.yml/badge.svg?branch=main&event=push)](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/test.yml)
[![ESLint](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/eslint.yml/badge.svg?branch=main&event=push)](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/codeql.yml/badge.svg?branch=main&event=schedule)](https://github.com/CatChen/eslint-suggestion-action/actions/workflows/codeql.yml)

This GitHub Action runs ESLint and provides inline feedback to the changes in a Pull Request. Features:

1. If ESLint can auto-fix a problem the fix would be created as an inline suggestion. You can decide whether you want to accept the fix as suggested.
2. It only provides feedback for the lines that are changed in the Pull Request. It doesn't create noise for pre-existing code that doesn't pass ESLint.

## Examples

When there is only one fix available this action will suggest that fix:

![fix-example-screenshot](https://user-images.githubusercontent.com/112175/164535202-70b7e18e-6f77-4288-84c7-5f7fa2b9fdd2.jpg)

When there are multiple suggestions available this action will show them all and let you decide which one matches your intent:

![suggestion-example-screenshot](https://user-images.githubusercontent.com/112175/164535483-e28bc2ac-8428-4ed9-a60a-8d85045753b9.jpg)

## Usage

Set up a GitHub Action like this:

```yaml
name: ESLint

on:
  push:
    branches: [main] # or [master] if that's name of the main branch
  pull_request:
    branches: [main] # or [master] if that's name of the main branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          check-latest: true

      - name: Install dependencies
        run: yarn install # or npm ci if you use npm and have the package-lock.json file

      - uses: CatChen/eslint-suggestion-action@v2
        with:
          request-changes: true # optional
          fail-check: false # optional
          github-token: ${{ secrets.GITHUB_TOKEN }} # optional
          directory: './' # optional
          targets: '.' # optional
          eslint-lib-path: './node_modules/eslint/lib/api.js' # optional
          config-path: '' # optional
```

Save the file to `.github/workflows/eslint.yml`. It will start working on new Pull Requests.

## Options

### `request-changes`

This option determines whether this GitHub Action should request change if there's any ESLint issue. This option has no effect when the Workflow isn't triggered by a `pull_request` event. The default value is `true`.

### `fail-check`

This option determines whether the GitHub Workflow should fail if there's any ESLint issue. The default value is `false`.

### `github-token`

The default value is `${{ github.token }}`, which is the GitHub token generated for this workflow. You can [create a different token with a different set of permissions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and use it here as well.

### `directory`

The default value is `"./"`. This action uses the ESLint installed in your project. This makes sure that it's using your project's ESLint config (plugins, rules, etc). It gets to know your project's location from this value.

### `targets`

The default value is `"."`. For example, it could be `"src"` or `"src/**/*.ts"` for a typical TypeScript project with source code files in the `src` directory. Use glob pattern to match multiple directories if necessary, for example `"{src,lib}"` instead of `"src lib"` or `"{src, lib}"` to match both the `src` directory and the `lib` directory.

### `eslint-lib-path`

The default value is `"./node_modules/eslint/lib/api.js"`. This action uses the ESLint installed in your project. This makes sure that it's using your project's ESLint version. It gets to know your project's ESLint library location from this value.

### `eslint-bin-path` (deprecated)

The default value is `"node_modules/.bin/eslint"`. This action uses the ESLint installed in your project. This makes sure that it's using your project's ESLint version. It gets to know your project's ESLint binary location from this value.

### `config-path`

The default value is an empty string. This action uses ESLint's default config file when this value is empty. That means `.eslintrc.json` or `.eslintrc.js` for ESLint up to 8.56.0, and `eslint.config.json` for ESLint 8.57.0 or 9+. If you name your config file differently you can set it here.

## FAQ

### What is the difference between a fix and a suggestion in ESLint?

[ESLint documentation](https://eslint.org/docs/developer-guide/working-with-rules) defines a fix as a change that **wouldn't change the runtime behavior of code and cause it to stop working**. In constrast, when **fixes aren't appropriate to be automatically applied, for example, if a fix potentially changes functionality or if there are multiple valid ways to fix a rule depending on the implementation intent** a rule will provide one or multiple suggestions. We have to review and decide if any one of them is appropriate.

### Can I have GitHub suggestions outside of the scope?

No. To be precise, it's mostly no. GitHub only allows comments within diff hunks. That means the lines that are changed and up to three adjacent lines before and after. There's no way to comment outside of diff hunks, in GitHub's interface or through API. For better consistency, this action doesn't create GitHub suggestions outside of the scope, even if it's within diff hunk.

### How can I avoid having annotation in generated code inside a project?

Please follow [GitHub's documentation](https://github.com/github/linguist/blob/master/docs/overrides.md#generated-code) and use `.gitattributes` to mark those files and directories correctly. GitHub will hide those files in Pull Request.
