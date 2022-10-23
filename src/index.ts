import path from "node:path";
import { context } from "@actions/github";
import { info, startGroup, endGroup, error } from "@actions/core";
import { WorkflowRunEvent } from "@octokit/webhooks-definitions/schema";
import { getESLint } from "./getESLint";
import { getESLintOutput } from "./getESLintOutput";
import { pullRequestEventHandler } from "./pullRequestEventHandler";
import { pushEventHandler } from "./pushEventHandler";
import { defaultEventHandler } from "./defaultEventHandler";
import { changeDirectory, DEFAULT_WORKING_DIRECTORY } from "./changeDirectory";

type LintResult = import("eslint").ESLint.LintResult;
type RuleMetaData = import("eslint").Rule.RuleMetaData;

export async function run() {
  startGroup("ESLint");
  changeDirectory();
  const { eslint, eslintBinPath } = await getESLint();
  const results = await getESLintOutput(eslintBinPath);

  const indexedResults: {
    [file: string]: LintResult;
  } = {};
  for (const file of results) {
    const relativePath = path.relative(
      DEFAULT_WORKING_DIRECTORY,
      file.filePath
    );
    info(`File name: ${relativePath}`);
    indexedResults[relativePath] = file;
    for (const message of file.messages) {
      info(`  [${message.severity}] ${message.message} @ ${message.line}`);
      if (message.suggestions) {
        info(`  Suggestions (${message.suggestions.length}):`);
        for (const suggestion of message.suggestions) {
          info(`    ${suggestion.desc} (${suggestion.messageId})`);
        }
      }
    }
  }
  const ruleMetaDatas: {
    [name: string]: RuleMetaData;
  } = eslint.getRulesMetaForResults(results);
  endGroup();

  info(`Event name: ${context.eventName}`);
  switch (context.eventName) {
    case "pull_request":
      pullRequestEventHandler(indexedResults, ruleMetaDatas);
      break;
    case "push":
      pushEventHandler(indexedResults, ruleMetaDatas);
      break;
    case "workflow_run":
      (() => {
        const workflowRun = context.payload as WorkflowRunEvent;
        switch (workflowRun.workflow_run.event) {
          case "pull_request":
            workflowRun.workflow_run.pull_requests;
            error(`Unimplemented GitHub Action event: ${context.eventName}`);
            return;
          case "push":
            error(`Unimplemented GitHub Action event: ${context.eventName}`);
            return;
          default:
            (() => {
              const workflowSourceEventName = workflowRun.workflow_run.event
                .split("_")
                .map((word) => word[0]?.toUpperCase() + word.substring(1))
                .join(" ");
              defaultEventHandler(
                `Workflow (${workflowSourceEventName})`,
                results,
                ruleMetaDatas
              );
            })();
            break;
        }
      })();
      break;
    default:
      defaultEventHandler(
        context.eventName
          .split("_")
          .map((word) => word[0]?.toUpperCase() + word.substring(1))
          .join(" "),
        results,
        ruleMetaDatas
      );
      break;
  }
}

run();
