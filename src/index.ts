import path from "node:path";
import { context } from "@actions/github";
import { info, startGroup, endGroup } from "@actions/core";
import { WorkflowRunEvent } from "@octokit/webhooks-definitions/schema";
import { getESLint } from "./getESLint";
import { getESLintOutput } from "./getESLintOutput";
import { handlePullRequest } from "./pullRequest";
import { handlePush } from "./push";
import { handleCommit } from "./commit";
import { changeDirectory, DEFAULT_WORKING_DIRECTORY } from "./changeDirectory";
import {
  getPullRequestMetadata,
  getPullRequestMetadataByNumber,
} from "./getPullRequestMetadata";

import type { ESLint, Rule } from "eslint";
import { getPushMetadata } from "./getPushMetadata";

export async function run() {
  startGroup("ESLint");
  changeDirectory();
  const { eslint, eslintBinPath } = await getESLint();
  const results = await getESLintOutput(eslintBinPath);

  const indexedResults: {
    [file: string]: ESLint.LintResult;
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
    [name: string]: Rule.RuleMetaData;
  } = eslint.getRulesMetaForResults(results);
  endGroup();

  info(`Event name: ${context.eventName}`);
  switch (context.eventName) {
    case "pull_request":
      await (async () => {
        const { owner, repo, pullRequestNumber, baseSha, headSha } =
          await getPullRequestMetadata();
        await handlePullRequest(
          indexedResults,
          ruleMetaDatas,
          owner,
          repo,
          pullRequestNumber,
          baseSha,
          headSha
        );
      })();
      break;
    case "push":
      await (async () => {
        const { owner, repo, beforeSha, afterSha } = await getPushMetadata();
        await handlePush(
          indexedResults,
          ruleMetaDatas,
          owner,
          repo,
          beforeSha,
          afterSha
        );
      })();
      break;
    case "workflow_run":
      await (async () => {
        const workflowRun = context.payload as WorkflowRunEvent;
        if (workflowRun.workflow_run.pull_requests.length > 0) {
          for (const pullRequest of workflowRun.workflow_run.pull_requests) {
            const { owner, repo, pullRequestNumber, baseSha, headSha } =
              await getPullRequestMetadataByNumber(pullRequest.number);
            await handlePullRequest(
              indexedResults,
              ruleMetaDatas,
              owner,
              repo,
              pullRequestNumber,
              baseSha,
              headSha
            );
          }
        } else {
          const workflowSourceEventName = workflowRun.workflow_run.event
            .split("_")
            .map((word) => word[0]?.toUpperCase() + word.substring(1))
            .join(" ");
          await handleCommit(
            `Workflow (${workflowSourceEventName})`,
            results,
            ruleMetaDatas
          );
        }
      })();
      break;
    default:
      handleCommit(
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
