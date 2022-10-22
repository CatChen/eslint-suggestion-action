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
import { Octokit } from "@octokit/core";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { components } from "@octokit/openapi-types/types";
import { Query, PullRequestReviewThread } from "@octokit/graphql-schema";
import { getESLint } from "./getESLint";
import { getESLintOutput } from "./getESLintOutput";
import { getOctokit } from "./getOctokit";
import { getPullRequestMetadata } from "./getPullRequestMetadata";
import { getPushMetadata } from "./getPushMetadata";
import { getIndexedModifiedLines } from "./getIndexedModifiedLines";

type LintResult = import("eslint").ESLint.LintResult;
type RuleMetaData = import("eslint").Rule.RuleMetaData;
type Fix = import("eslint").Rule.Fix;

type ReviewSuggestion = {
  start_side?: "RIGHT";
  start_line?: number;
  side: "RIGHT";
  line: number;
  body: string;
};

type ReviewComment = ReviewSuggestion & { path: string };

const WORKING_DIRECTORY = process.cwd();
const REVIEW_BODY = "ESLint doesn't pass. Please fix all ESLint issues.";

export function changeDirectory() {
  info(`Working directory is: ${WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(
    WORKING_DIRECTORY,
    getInput("directory")
  );
  info(`Working directory is changed to: ${absoluteDirectory}`);
  process.chdir(absoluteDirectory);
}

export async function getPullRequestFiles(
  owner: string,
  repo: string,
  pullRequestNumber: number,
  octokit: Octokit & Api
) {
  const response = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullRequestNumber,
  });
  info(`Files: (${response.data.length})`);
  return response.data;
}

export async function getReviewComments(
  owner: string,
  repo: string,
  pullRequestNumber: number,
  octokit: Octokit & Api
) {
  const reviews = await octokit.rest.pulls.listReviews({
    owner,
    repo,
    pull_number: pullRequestNumber,
  });
  const reviewComments = await octokit.rest.pulls.listReviewComments({
    owner,
    repo,
    pull_number: pullRequestNumber,
  });
  const relevantReviews = reviews.data.filter(
    (review) => review.user?.id === 41898282 && review.body === REVIEW_BODY
  );
  const relevantReviewIds = relevantReviews.map((review) => review.id);
  const relevantReviewComments = reviewComments.data.filter(
    (reviewComment) =>
      reviewComment.user.id === 41898282 &&
      reviewComment.pull_request_review_id !== null &&
      relevantReviewIds.includes(reviewComment.pull_request_review_id)
  );
  info(`Existing review comments: (${relevantReviewComments.length})`);
  return relevantReviewComments;
}

export async function getReviewThreads(
  owner: string,
  repo: string,
  pullRequestNumber: number,
  octokit: Octokit & Api
) {
  const commentNodeIdToReviewThreadMapping: {
    [id: string]: PullRequestReviewThread;
  } = {};
  const queryData = await octokit.graphql<Query>(
    `
      query ($owner: String!, $repo: String!, $pullRequestNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          pullRequest(number: $pullRequestNumber) {
            reviewThreads(last: 100) {
              totalCount
              nodes {
                id
                isResolved
                comments(last: 100) {
                  totalCount
                  nodes {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      owner,
      repo,
      pullRequestNumber,
    }
  );

  const reviewThreadTotalCount =
    queryData?.repository?.pullRequest?.reviewThreads?.totalCount;
  if (reviewThreadTotalCount !== undefined && reviewThreadTotalCount > 100) {
    error(`There are more than 100 review threads: ${reviewThreadTotalCount}`);
  }

  const reviewThreads =
    queryData?.repository?.pullRequest?.reviewThreads?.nodes;
  if (reviewThreads !== undefined && reviewThreads !== null) {
    for (const reviewThread of reviewThreads) {
      if (reviewThread === null) {
        continue;
      }
      const commentTotalCount = reviewThread?.comments?.totalCount;
      if (commentTotalCount !== undefined && commentTotalCount > 100) {
        error(
          `There are more than 100 review comments in review thread ${reviewThread?.id}: ${commentTotalCount}`
        );
      }

      const comments = reviewThread?.comments?.nodes;
      if (comments !== undefined && comments !== null) {
        for (const comment of comments) {
          const commentId = comment?.id;
          if (commentId === undefined) {
            continue;
          }
          commentNodeIdToReviewThreadMapping[commentId] = reviewThread;
        }
      }
    }
  }
  return commentNodeIdToReviewThreadMapping;
}

export function getCommentFromFix(source: string, line: number, fix: Fix) {
  const textRange = source.substring(fix.range[0], fix.range[1]);
  const impactedOriginalLines = textRange.split("\n").length;
  const originalLines = source
    .split("\n")
    .slice(line - 1, line - 1 + impactedOriginalLines);
  const replacedSource =
    source.substring(0, fix.range[0]) +
    fix.text +
    source.substring(fix.range[1]);
  const impactedReplaceLines = fix.text.split("\n").length;
  const replacedLines = replacedSource
    .split("\n")
    .slice(line - 1, line - 1 + impactedReplaceLines);
  info(
    "    Fix:\n" +
      "      " +
      `@@ -${line},${impactedOriginalLines} +${impactedReplaceLines} @@\n` +
      `${originalLines.map((line) => "      - " + line).join("\n")}\n` +
      `${replacedLines.map((line) => "      + " + line).join("\n")}`
  );
  const reviewSuggestion: ReviewSuggestion = {
    start_side: impactedOriginalLines === 1 ? undefined : "RIGHT",
    start_line: impactedOriginalLines === 1 ? undefined : line,
    side: "RIGHT",
    line: line + impactedOriginalLines - 1,
    body: "```suggestion\n" + `${replacedLines.join("\n")}\n` + "```\n",
  };
  return reviewSuggestion;
}

export function matchReviewComments(
  reviewComments: components["schemas"]["review-comment"][],
  reviewComment: ReviewComment
) {
  const matchedNodeIds: string[] = [];
  for (const existingReviewComment of reviewComments) {
    if (
      existingReviewComment.path === reviewComment.path &&
      existingReviewComment.line === reviewComment.line &&
      existingReviewComment.side === reviewComment.side &&
      existingReviewComment.start_line == reviewComment.start_line && // null-undefined comparison
      existingReviewComment.start_side == reviewComment.start_side && // null-undefined comparison
      existingReviewComment.body === reviewComment.body
    ) {
      matchedNodeIds.push(existingReviewComment.node_id);
    }
  }
  return matchedNodeIds;
}

export async function pullRequestEventHandler(
  indexedResults: {
    [file: string]: LintResult;
  },
  ruleMetaDatas: {
    [name: string]: RuleMetaData;
  }
) {
  const failCheck = getBooleanInput("fail-check");
  const requestChanges = getBooleanInput("request-changes");

  startGroup("GitHub Pull Request");
  const octokit = getOctokit();
  const { owner, repo, pullRequestNumber, headSha } =
    await getPullRequestMetadata();
  const files = await getPullRequestFiles(
    owner,
    repo,
    pullRequestNumber,
    octokit
  );

  const existingReviewComments = await getReviewComments(
    owner,
    repo,
    pullRequestNumber,
    octokit
  );

  const commentNodeIdToReviewThreadMapping = await getReviewThreads(
    owner,
    repo,
    pullRequestNumber,
    octokit
  );

  let commentsCounter = 0;
  const reviewComments: ReviewComment[] = [];
  let matchedReviewCommentNodeIds: { [nodeId: string]: boolean } = {};
  for (const file of files) {
    info(`  File name: ${file.filename}`);
    info(`  File status: ${file.status}`);
    if (file.status === "removed") {
      continue;
    }

    const indexedModifiedLines = getIndexedModifiedLines(file);

    const result = indexedResults[file.filename];
    if (result) {
      for (const message of result.messages) {
        if (message.ruleId === null || result.source === undefined) {
          continue;
        }
        const rule = ruleMetaDatas[message.ruleId];
        if (indexedModifiedLines[message.line]) {
          info(`  Matched line: ${message.line}`);
          if (message.fix) {
            const reviewSuggestion = getCommentFromFix(
              result.source,
              message.line,
              message.fix
            );
            const reviewComment = {
              ...reviewSuggestion,
              body:
                `**${message.message}** [${message.ruleId}](${rule?.docs?.url})\n\nFix available:\n\n` +
                reviewSuggestion.body,
              path: file.filename,
            };
            const matchedComments = matchReviewComments(
              existingReviewComments,
              reviewComment
            );
            commentsCounter++;
            if (matchedComments.length === 0) {
              reviewComments.push(reviewComment);
              info(`    Comment queued`);
            } else {
              matchedReviewCommentNodeIds = {
                ...matchedReviewCommentNodeIds,
                ...Object.fromEntries(
                  matchedComments.map((nodeId) => [nodeId, true])
                ),
              };
              info(`    Comment skipped`);
            }
          } else if (message.suggestions) {
            let reviewSuggestions: ReviewSuggestion | undefined = undefined;
            for (const suggestion of message.suggestions) {
              const reviewSuggestion = getCommentFromFix(
                result.source,
                message.line,
                suggestion.fix
              );
              if (reviewSuggestions === undefined) {
                reviewSuggestions = { ...reviewSuggestion };
              } else {
                if (
                  reviewSuggestion.start_line !==
                    reviewSuggestions.start_line ||
                  reviewSuggestion.line !== reviewSuggestions.line
                ) {
                  error(
                    `    Suggestions have mismatched line(s): ${
                      reviewSuggestions.start_line === undefined
                        ? ""
                        : reviewSuggestions.start_line + ":"
                    }${reviewSuggestions.line} and ${
                      reviewSuggestion.start_line === undefined
                        ? ""
                        : reviewSuggestion.start_line + ":"
                    }${reviewSuggestion.line}`
                  );
                }
                reviewSuggestions.body += "\n" + reviewSuggestion.body;
              }
            }
            if (reviewSuggestions !== undefined) {
              const reviewComment = {
                ...reviewSuggestions,
                body:
                  `**${message.message}** [${message.ruleId}](${rule?.docs?.url})\n\nSuggestion(s) available:\n\n` +
                  reviewSuggestions.body,
                path: file.filename,
              };
              const matchedComments = matchReviewComments(
                existingReviewComments,
                reviewComment
              );
              commentsCounter++;
              if (matchedComments.length === 0) {
                reviewComments.push(reviewComment);
                info(`    Comment queued`);
              } else {
                matchedReviewCommentNodeIds = {
                  ...matchedReviewCommentNodeIds,
                  ...Object.fromEntries(
                    matchedComments.map((nodeId) => [nodeId, true])
                  ),
                };
                info(`    Comment skipped`);
              }
            }
          } else {
            const reviewComment: ReviewComment = {
              body: `**${message.message}** [${message.ruleId}](${rule?.docs?.url})`,
              path: file.filename,
              side: "RIGHT",
              line: message.line,
            };
            const matchedComments = matchReviewComments(
              existingReviewComments,
              reviewComment
            );
            commentsCounter++;
            if (matchedComments.length === 0) {
              reviewComments.push(reviewComment);
              info(`    Comment queued`);
            } else {
              matchedReviewCommentNodeIds = {
                ...matchedReviewCommentNodeIds,
                ...Object.fromEntries(
                  matchedComments.map((nodeId) => [nodeId, true])
                ),
              };
              info(`    Comment skipped`);
            }
          }
        }
      }
    }
  }
  endGroup();

  startGroup("Feedback");
  for (const reviewComment of existingReviewComments) {
    const reviewThread =
      commentNodeIdToReviewThreadMapping[reviewComment.node_id];
    if (reviewThread !== undefined) {
      if (
        matchedReviewCommentNodeIds[reviewComment.node_id] &&
        reviewThread.isResolved
      ) {
        octokit.graphql(
          `
            mutation ($nodeId: ID!) {
              unresolveReviewThread(input: {threadId: $nodeId}) {
                thread {
                  id
                }
              }
            }
          `,
          {
            nodeId: reviewThread.id,
          }
        );
        info(`Review comment unresolved: ${reviewComment.url}`);
      } else if (
        !matchedReviewCommentNodeIds[reviewComment.node_id] &&
        !reviewThread.isResolved
      ) {
        octokit.graphql(
          `
            mutation ($nodeId: ID!) {
              resolveReviewThread(input: {threadId: $nodeId}) {
                thread {
                  id
                }
              }
            }
          `,
          {
            nodeId: reviewThread.id,
          }
        );
        info(`Review comment resolved: ${reviewComment.url}`);
      } else {
        info(
          `Review comment remains ${
            reviewThread.isResolved ? "resolved" : "unresolved"
          }: ${reviewComment.url}`
        );
      }
    } else {
      error(
        `Review comment has no associated review thread: ${reviewComment.url}`
      );
    }
  }
  if (commentsCounter > 0) {
    const response = await octokit.rest.pulls.createReview({
      owner,
      repo,
      body: REVIEW_BODY,
      pull_number: pullRequestNumber,
      commit_id: headSha,
      event: requestChanges ? "REQUEST_CHANGES" : "COMMENT",
      comments: reviewComments,
    });
    if (response.status !== 200) {
      throw new Error(
        `Failed to create review with ${reviewComments.length} comment(s).`
      );
    }
    if (commentsCounter - reviewComments.length > 0) {
      info(
        `Review comments existed and skipped: ${
          commentsCounter - reviewComments.length
        }`
      );
    }
    info(`Review comments submitted: ${reviewComments.length}`);
    if (failCheck) {
      throw new Error("ESLint fails. Please review comments.");
    } else {
      error("ESLint fails");
    }
  } else {
    info("ESLint passes");
  }
  endGroup();
}

export async function getPushFiles(
  owner: string,
  repo: string,
  beforeSha: string,
  afterSha: string,
  octokit: Octokit & Api
) {
  const response = await octokit.rest.repos.compareCommitsWithBasehead({
    owner,
    repo,
    basehead: `${beforeSha}...${afterSha}`,
  });
  info(`Files: (${response.data.files?.length ?? 0})`);
  return response.data.files;
}

export async function pushEventHandler(
  indexedResults: {
    [file: string]: LintResult;
  },
  ruleMetaDatas: {
    [name: string]: RuleMetaData;
  }
) {
  const failCheck = getBooleanInput("fail-check");

  startGroup("GitHub Push");
  const octokit = getOctokit();
  const { owner, repo, beforeSha, afterSha } = await getPushMetadata();
  const files = await getPushFiles(owner, repo, beforeSha, afterSha, octokit);

  if (files === undefined || files.length === 0) {
    info(`Push contains no files`);
    return;
  }

  let warningCounter = 0;
  let errorCounter = 0;
  for (const file of files) {
    info(`  File name: ${file.filename}`);
    info(`  File status: ${file.status}`);
    if (file.status === "removed") {
      continue;
    }

    const indexedModifiedLines = getIndexedModifiedLines(file);

    const result = indexedResults[file.filename];
    if (result) {
      for (const message of result.messages) {
        if (message.ruleId === null || result.source === undefined) {
          continue;
        }
        const rule = ruleMetaDatas[message.ruleId];
        if (indexedModifiedLines[message.line]) {
          info(`  Matched line: ${message.line}`);
          switch (message.severity) {
            case 0:
              notice(
                `[${message.ruleId}]${message.message}: (${rule?.docs?.url})`,
                {
                  file: file.filename,
                  startLine: message.line,
                }
              );
              break;
            case 1:
              warning(
                `[${message.ruleId}]${message.message}: (${rule?.docs?.url})`,
                {
                  file: file.filename,
                  startLine: message.line,
                }
              );
              warningCounter++;
              break;
            case 2:
              error(
                `[${message.ruleId}]${message.message}: (${rule?.docs?.url})`,
                {
                  file: file.filename,
                  startLine: message.line,
                }
              );
              errorCounter++;
              break;
          }
        }
      }
    }
  }
  endGroup();

  startGroup("Feedback");
  if (warningCounter > 0 || errorCounter > 0) {
    if (failCheck) {
      throw new Error("ESLint fails. Please review comments.");
    } else {
      error("ESLint fails");
    }
  } else {
    info("ESLint passes");
  }
  endGroup();
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
