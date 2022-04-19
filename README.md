# eslint-suggestion-action

This is a GitHub Action that runs ESLint and provides inline feedback to the changes in a Pull Request. Features:

1. If ESLint can auto-fix a problem the fix would be created as an inline suggestion. You can decide whether you want to accept the fix as suggested.
2. It only provides feedback for the lines that are changed in the Pull Request. It doesn't create noise for pre-existing code that doesn't pass ESLint.

## Usage

Set up a GitHub Action like this:

```yaml
name: ESLint

on:
  pull_request:
    branches: [main] # or [master] if that's name of the main branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
          check-latest: true

      - name: Install dependencies
        run: yarn install # or npm ci if you use npm and have the package-lock.json file

      - uses: CatChen/eslint-suggestion-action@v1.4.0
        with:
          github-workspace: ${{ github.workspace }} # required
          github-token: ${{ secrets.GITHUB_TOKEN }} # optional
          eslint-path: "node_modules/.bin/eslint" # optional
          out-of-scope-annotations: false # optional
          suppress-fixes: false # optional
          suppress-suggestions: false # optional
          suppress-annotations: false # optional
```

Save the file to `.github/workflows/eslint.yml`. It will start working on new Pull Requests.

## Options

### `github-workspace`

This action uses the ESLint installed in your project. It makes sure that it's your project's ESLint version and config (plugins, rules, etc). It has to know your project's directory (aka GitHub Workspace). Please always use `${{ github.workspace }}` as the value.

### `github-token`

The default value is `${{ github.token }}`, which is the GitHub token generated for this workflow. You can [create a different token with a different set of permissions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and use it here as well.

### `out-of-scope-annotations`

By default this action doesn't touch anything outside of the scope of the Pull Request That means any unchanged files and lines in the project. It only touch the lines that are changed. If we set this to `true` the action will add annotation for ESLint feedback outside of the scope.

### `suppress-fixes`

If this is set to `true` there will be no GitHub suggestion for ESLint fixes. Annotation will be shown instead unless `suppress-annotations` is set to `true` as well. See the FAQ below to understand the difference between fix and suggestion in ESLint.

### `suppress-suggestions`

If this is set to `true` there will be no GitHub suggestion for ESLint suggestions. Annotation will be shown instead unless `suppress-annotations` is set to `true` as well. See the FAQ below to understand the difference between fix and suggestion in ESLint.

### `suppress-annotations`

If this is set to `true` there will be no annotation all all, inside or outside of the scope.

## FAQ

### What is the difference between a fix and a suggestion in ESLint?

[ESLint documentation](https://eslint.org/docs/developer-guide/working-with-rules) defines a fix as a change that **wouldn't change the runtime behavior of code and cause it to stop working**. In constrast, when **fixes aren't appropriate to be automatically applied, for example, if a fix potentially changes functionality or if there are multiple valid ways to fix a rule depending on the implementation intent** a rule will provide one or multiple suggestions. We have to review and decide if any one of them is appropriate.

### Can I have GitHub suggestions outside of the scope?

No. To be precise, it's mostly no. GitHub only allows comments within diff hunks. That means the lines that are changed and up to three adjacent lines before and after. There's no way to comment outside of diff hunks, in GitHub's interface or through API. For better consistency, this action doesn't create GitHub suggestions outside of the scope, even if it's within diff hunk.

### How can I avoid having annotation in generated code inside a project?

Please follow [GitHub's documentation](https://github.com/github/linguist/blob/master/docs/overrides.md#generated-code) and use `.gitattributes` to mark those files and directories correctly. GitHub will hide those files in Pull Request.
