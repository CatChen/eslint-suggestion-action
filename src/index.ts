import type { WorkflowRunEvent } from '@octokit/webhooks-types/schema.d.ts';
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

export async function eslintFeedback({
  requestChanges,
  failCheck,
  githubToken,
  directory,
  targets,
  eslintLibPath,
  eslintBinPath,
  configPath,
}: {
  requestChanges: boolean;
  failCheck: boolean;
  githubToken: string;
  directory: string;
  targets: string;
  eslintLibPath: string;
  eslintBinPath: string;
  configPath: string;
}): Promise<void> {
  void eslintBinPath;
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
        const { owner, repo, pullRequestNumber, baseSha, headSha } =
          getPullRequestMetadata();
        await handlePullRequest(
          octokit,
          indexedResults,
          ruleMetaData,
          owner,
          repo,
          pullRequestNumber,
          baseSha,
          headSha,
          failCheck,
          requestChanges,
        );
      })();
      break;
    case 'push':
      await (async () => {
        const { owner, repo, beforeSha, afterSha } = getPushMetadata();
        await handlePush(
          octokit,
          indexedResults,
          ruleMetaData,
          owner,
          repo,
          beforeSha,
          afterSha,
          failCheck,
        );
      })();
      break;
    case 'workflow_run':
      await (async () => {
        const workflowRun = context.payload as WorkflowRunEvent;
        if (workflowRun.workflow_run.pull_requests.length > 0) {
          for (const pullRequest of workflowRun.workflow_run.pull_requests) {
            const { owner, repo, pullRequestNumber, baseSha, headSha } =
              await getPullRequestMetadataByNumber(octokit, pullRequest.number);
            await handlePullRequest(
              octokit,
              indexedResults,
              ruleMetaData,
              owner,
              repo,
              pullRequestNumber,
              baseSha,
              headSha,
              failCheck,
              requestChanges,
            );
          }
        } else {
          const workflowSourceEventName = workflowRun.workflow_run.event
            .split('_')
            .map((word) => word[0]?.toUpperCase() + word.substring(1))
            .join(' ');
          handleCommit(
            `Workflow (${workflowSourceEventName})`,
            results,
            ruleMetaData,
            failCheck,
          );
        }
      })();
      break;
    default:
      handleCommit(
        context.eventName
          .split('_')
          .map((word) => word[0]?.toUpperCase() + word.substring(1))
          .join(' '),
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
    eslintBinPath: getInput('eslint-bin-path'),
    configPath: getInput('config-path'),
  });
}

run().catch((error: Error) => setFailed(error));
