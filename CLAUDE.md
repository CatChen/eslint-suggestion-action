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
yarn codegen && yarn lint --fix && yarn build && yarn bundle
```

Do not treat work as complete until the validation command succeeds. If it fails, fix the issues and run it again.
