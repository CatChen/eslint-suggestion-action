import { context } from "@actions/github";
import {
  getInput,
  getBooleanInput,
  info,
  startGroup,
  endGroup,
  error,
  notice,
  warning,
} from "@actions/core";
import { WorkflowRunEvent } from "@octokit/webhooks-definitions/schema";
import process from "node:process";
import path from "node:path";
import { getESLint } from "./getESLint";
import { getESLintOutput } from "./getESLintOutput";
import { pullRequestEventHandler } from "./pullRequestEventHandler";
import { pushEventHandler } from "./pushEventHandler";

type LintResult = import("eslint").ESLint.LintResult;
type RuleMetaData = import("eslint").Rule.RuleMetaData;

const WORKING_DIRECTORY = process.cwd();

export function changeDirectory() {
  info(`Working directory is: ${WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(
    WORKING_DIRECTORY,
    getInput("directory")
  );
  info(`Working directory is changed to: ${absoluteDirectory}`);
  process.chdir(absoluteDirectory);
}

export async function defaultEventHandler(
  eventName: string,
  results: LintResult[],
  ruleMetaDatas: {
    [name: string]: RuleMetaData;
  }
) {
  const failCheck = getBooleanInput("fail-check");

  startGroup(`GitHub ${eventName}`);
  let warningCounter = 0;
  let errorCounter = 0;

  for (const result of results) {
    const relativePath = path.relative(WORKING_DIRECTORY, result.filePath);
    for (const message of result.messages) {
      if (message.ruleId === null || result.source === undefined) {
        continue;
      }
      const rule = ruleMetaDatas[message.ruleId];
      info(`  ${relativePath}:${message.line}`);
      switch (message.severity) {
        case 0:
          notice(
            `[${message.ruleId}]${message.message}: (${rule?.docs?.url})`,
            {
              file: relativePath,
              startLine: message.line,
            }
          );
          break;
        case 1:
          warning(
            `[${message.ruleId}]${message.message}: (${rule?.docs?.url})`,
            {
              file: relativePath,
              startLine: message.line,
            }
          );
          warningCounter++;
          break;
        case 2:
          error(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
            file: relativePath,
            startLine: message.line,
          });
          errorCounter++;
          break;
      }
    }
  }
  endGroup();

  startGroup("Feedback");
  if (warningCounter > 0 || errorCounter > 0) {
    if (failCheck) {
      throw new Error("ESLint fails.");
    } else {
      error("ESLint fails");
    }
  } else {
    info("ESLint passes");
  }
  endGroup();
}

export async function run() {
  startGroup("ESLint");
  changeDirectory();
  const { eslint, eslintBinPath } = await getESLint();
  const results = await getESLintOutput(eslintBinPath);

  const indexedResults: {
    [file: string]: LintResult;
  } = {};
  for (const file of results) {
    const relativePath = path.relative(WORKING_DIRECTORY, file.filePath);
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
