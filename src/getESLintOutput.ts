import { join } from "node:path";
import { ExitCode, getInput } from "@actions/core";
import { getExecOutput } from "@actions/exec";
import { create } from "@actions/glob";

import type { ESLint } from "eslint";

export async function getESLintOutput(eslintBinPath: string) {
  const targets = getInput("targets");
  const globber = await create(targets);
  const glob = await globber.glob();
  const eslintOutput = await getExecOutput(eslintBinPath, [
    ...glob,
    "--no-error-on-unmatched-pattern",
    "--format",
    "json",
  ]);
  if (eslintOutput.exitCode !== ExitCode.Success) {
    throw new Error(eslintOutput.stderr);
  }
  const results: ESLint.LintResult[] = JSON.parse(eslintOutput.stdout);
  return results;
}
