# Agent Instructions

These instructions apply to all coding agents in this repository (Cursor, Claude Code, Codex).

## Required setup command

After opening or setting up the project, run:

```bash
yarn
```

## Required validation command

After making changes, run:

```bash
yarn codegen && yarn format && yarn lint --fix && yarn build && yarn bundle
```

Do not treat work as complete until the validation command succeeds. If it fails, fix the issues and run it again.

## Pull Request issues

**Failed tests**: When the user mentions failed tests, fetch the PR's failed checks and inspect the relevant workflow runs. The `link` field contains the run ID in the format `.../actions/runs/<RUN_ID>/jobs/...`:

```bash
gh pr checks <PR_NUMBER> --json name,state,link
gh run view <RUN_ID> --log-failed
```

**Review comments**: When the user mentions comments, use `gh api graphql` to query `pullRequest.reviewThreads` and focus on threads where `isResolved` is `false`. The REST API does not expose resolution state - GraphQL `PullRequestReviewThread.isResolved` is required.
