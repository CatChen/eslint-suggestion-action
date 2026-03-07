import type { WorkflowRunEvent } from '@octokit/webhooks-types';
import type { ESLint, Rule } from 'eslint';
import path from 'node:path';
import { cwd } from 'node:process';
import {
  endGroup,
  getBooleanInput,
  getInput,
  info,
  setFailed,
  startGroup,
} from '@actions/core';
import { context } from '@actions/github';
import { changeDirectory } from './changeDirectory.js';
import { handleCommit } from './commit.js';
import { getESLint } from './getESLint.js';
import { getESLintResults } from './getESLintResults.js';
import { getOctokit } from './getOctokit.js';
import {
  getPullRequestMetadata,
  getPullRequestMetadataByNumber,
} from './getPullRequestMetadata.js';
import { getPushMetadata } from './getPushMetadata.js';
import { handlePullRequest } from './pullRequest.js';
import { handlePush } from './push.js';

function formatEventName(eventName: string) {
  return eventName
    .split('_')
    .map((word) => word[0]?.toUpperCase() + word.substring(1))
    .join(' ');
}

export async function eslintFeedback({
  requestChanges,
  failCheck,
  githubToken,
  directory,
  targets,
  eslintLibPath,
  configPath,
}: {
  requestChanges: boolean;
  failCheck: boolean;
  githubToken: string;
  directory: string;
  targets: string;
  eslintLibPath: string;
  configPath: string;
}): Promise<void> {
  startGroup('ESLint');
  changeDirectory(directory);
  const eslint = await getESLint(eslintLibPath, configPath);
  const results = await getESLintResults(eslint, targets);

  const indexedResults: {
    [file: string]: ESLint.LintResult;
  } = {};
  for (const file of results) {
    const relativePath = path.relative(cwd(), file.filePath);
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
  const ruleMetaData: {
    [name: string]: Rule.RuleMetaData;
  } = eslint.getRulesMetaForResults(results);
  endGroup();

  const octokit = getOctokit(githubToken);
  info(`Event name: ${context.eventName}`);
  switch (context.eventName) {
    case 'pull_request':
    case 'pull_request_target':
      await (async () => {
        const { owner, repo, pullRequestNumber, headSha } =
          getPullRequestMetadata();
        await handlePullRequest(
          octokit,
          indexedResults,
          ruleMetaData,
          owner,
          repo,
          pullRequestNumber,
          headSha,
          failCheck,
          requestChanges,
        );
      })();
      break;
    case 'push':
      await (async () => {
        const { beforeSha, afterSha, created, deleted } = getPushMetadata();
        await handlePush(
          indexedResults,
          ruleMetaData,
          beforeSha,
          afterSha,
          created,
          deleted,
          failCheck,
        );
      })();
      break;
    case 'workflow_run':
      await (async () => {
        const workflowRun = context.payload as WorkflowRunEvent;
        const headSha = workflowRun.workflow_run.head_sha;
        if (workflowRun.workflow_run.pull_requests.length > 0) {
          for (const pullRequest of workflowRun.workflow_run.pull_requests) {
            const { owner, repo, pullRequestNumber } =
              await getPullRequestMetadataByNumber(octokit, pullRequest.number);
            await handlePullRequest(
              octokit,
              indexedResults,
              ruleMetaData,
              owner,
              repo,
              pullRequestNumber,
              headSha,
              failCheck,
              requestChanges,
            );
          }
        } else {
          handleCommit(
            `Workflow (${formatEventName(workflowRun.workflow_run.event)})`,
            results,
            ruleMetaData,
            failCheck,
          );
        }
      })();
      break;
    default:
      handleCommit(
        formatEventName(context.eventName),
        results,
        ruleMetaData,
        failCheck,
      );
      break;
  }
}

async function run(): Promise<void> {
  await eslintFeedback({
    requestChanges: getBooleanInput('request-changes'),
    failCheck: getBooleanInput('fail-check'),
    githubToken: getInput('github-token'),
    directory: getInput('directory'),
    targets: getInput('targets'),
    eslintLibPath: getInput('eslint-lib-path'),
    configPath: getInput('config-path'),
  });
}

run().catch((error: Error) => setFailed(error));
