# eslint-suggestion-action

This is a GitHub Action that runs ESLint and provides inline feedback to the changes in a Pull Request. Features:

1. If ESLint can auto-fix a problem the fix would be created as an inline suggestion. You can decide whether you want to accept the fix as suggested.
2. It only provides feedback for the lines that are changed in the Pull Request. It doesn't create noise for pre-existing code that doesn't pass ESLint.

## Usage

Set up a GitHub Action like this:

```yaml
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

      - uses: CatChen/eslint-suggestion-action@v1.1.29
        with:
          github-workspace: ${{ github.workspace }} # required
          github-token: ${{ secrets.GITHUB_TOKEN }} # optional
          eslint-path: "node_modules/.bin/eslint" # optional
```

Save the file to `.github/workflows/eslint.yml`. It will start working on new Pull Requests.
