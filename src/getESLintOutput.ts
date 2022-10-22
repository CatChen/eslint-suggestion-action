import childProcess from "node:child_process";
import { getInput } from "@actions/core";
type LintResult = import("eslint").ESLint.LintResult;

export async function getESLintOutput(eslintBinPath: string) {
  const targets = getInput("targets");
  let results: LintResult[] = [];
  try {
    const stdout = childProcess.execSync(
      `${eslintBinPath} "${targets}" --no-error-on-unmatched-pattern --format json`
    );
    results = JSON.parse(stdout.toString());
  } catch (error) {
    // Ignore the error.
  }
  return results;
}
