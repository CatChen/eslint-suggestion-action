import { context } from "@actions/github";
import { GitHub, getOctokitOptions } from "@actions/github/lib/utils";
import {
  getInput,
  getBooleanInput,
  info,
  startGroup,
  endGroup,
  error,
} from "@actions/core";
import { PullRequest } from "@octokit/webhooks-definitions/schema";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import process from "node:process";
import childProcess from "node:child_process";
import path from "node:path";
import { existsSync } from "node:fs";
import { createRequire } from "module";
import { Octokit } from "@octokit/core";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { components } from "@octokit/openapi-types/types";
import { Query, PullRequestReviewThread } from "@octokit/graphql-schema";

type LintResult = import("eslint").ESLint.LintResult;
type RuleMetaData = import("eslint").Rule.RuleMetaData;
type Fix = import("eslint").Rule.Fix;

type MockConfig = {
  token: string;
  owner: string;
  repo: string;
  number: number;
};

type ReviewSuggestion = {
  start_side?: "RIGHT";
  start_line?: number;
  side: "RIGHT";
  line: number;
  body: string;
};

type ReviewComment = ReviewSuggestion & { path: string };

const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
const WORKING_DIRECTORY = process.cwd();
const REVIEW_BODY = "ESLint doesn't pass. Please fix all ESLint issues.";

const USELESS2 = "";
const USELESS3 = "";

export function changeDirectory(mock: MockConfig | undefined) {
  info(`Working directory is: ${WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(
    WORKING_DIRECTORY,
    mock === undefined ? getInput("directory") : "./"
  );
  info(`Working directory is changed to: ${absoluteDirectory}`);
  process.chdir(absoluteDirectory);
}

export async function getESLint(mock: MockConfig | undefined) {
  const absoluteDirectory = path.resolve(
    WORKING_DIRECTORY,
    mock === undefined ? getInput("directory") : "./"
  );
  const require = createRequire(absoluteDirectory);
  const eslintJsPath = path.resolve(
    absoluteDirectory,
    mock === undefined
      ? getInput("eslint-lib-path")
      : "./node_modules/eslint/lib/api.js"
  );
  if (!existsSync(eslintJsPath)) {
    throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
  }
  info(`Using ESLint from: ${eslintJsPath}`);
  const { ESLint } = require(eslintJsPath);
  const eslintConfig = await new ESLint().calculateConfigForFile(
    "package.json"
  );
  const eslint = new ESLint({ baseConfig: eslintConfig });

  const eslintBinPath =
    mock === undefined
      ? getInput("eslint-bin-path")
      : "./node_modules/.bin/eslint";
  if (!existsSync(eslintBinPath)) {
    throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
  }
  info(`Using ESLint binary from: ${eslintBinPath}`);

  return { eslint, eslintBinPath };
}

export async function getESLintOutput(
  mock: MockConfig | undefined,
  eslintBinPath: string
) {
  const targets = mock === undefined ? getInput("targets") : ".";
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

export function getOctokit(mock: MockConfig | undefined) {
  const githubToken = mock?.token || getInput("github-token");
  const Octokit = GitHub.plugin(throttling, retry);
  const octokit = new Octokit(
    getOctokitOptions(githubToken, {
      throttle: {
        onRateLimit: (
          retryAfter: number,
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          }
        ) => {
          if (options.request.retryCount === 0) {
            octokit.log.warn(
              `Request quota exhausted for request ${options.method} ${options.url}`
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.error(
              `Request quota exhausted for request ${options.method} ${options.url}`
            );
          }
        },
        onSecondaryRateLimit: (
          retryAfter: number,
          options: {
            method: string;
            url: string;
            request: { retryCount: number };
          }
        ) => {
          if (options.request.retryCount === 0) {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`
            );
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          } else {
            octokit.log.warn(
              `Abuse detected for request ${options.method} ${options.url}`
            );
          }
        },
      },
      retry: {
        doNotRetry: ["429"],
      },
    })
  );
  return octokit;
}

export async function getPullRequestMetadata(
  mock: MockConfig | undefined,
  octokit: Octokit & Api
) {
  let pullRequest: PullRequest;
  if (mock) {
    const response = await octokit.rest.pulls.get({
      owner: mock.owner,
      repo: mock.repo,
      pull_number: mock.number,
    });
    pullRequest = response.data as PullRequest;
  } else {
    pullRequest = context.payload.pull_request as PullRequest;
  }
  const owner = mock?.owner || context.repo.owner;
  const repo = mock?.repo || context.repo.repo;
  const pullRequestNumber = mock?.number || pullRequest.number;
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;

  info(`Owner: ${owner}`);
  info(`Repo: ${repo}`);
  info(`Pull request number: ${pullRequestNumber}`);
  info(`Base SHA: ${baseSha}`);
  info(`Head SHA: ${headSha}`);

  return {
    owner,
    repo,
    pullRequestNumber,
    baseSha,
    headSha,
  };
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

export function getIndexedModifiedLines(
  file: components["schemas"]["diff-entry"]
): {
  [line: string]: true;
} {
  const modifiedLines = [];
  const indexedModifiedLines: { [line: string]: true } = {};
  let currentLine = 0;
  let remainingLinesInHunk = 0;
  const lines = file.patch?.split("\n");
  if (lines) {
    for (const line of lines) {
      if (remainingLinesInHunk === 0) {
        const matches = line.match(HUNK_HEADER_PATTERN);
        currentLine = parseInt(matches?.[2] || "1");
        remainingLinesInHunk = parseInt(matches?.[4] || "1");
        if (!currentLine || !remainingLinesInHunk) {
          throw new Error(
            `Expecting hunk header in ${file.filename} but seeing ${line}.`
          );
        }
      } else if (line[0] === "-") {
        continue;
      } else {
        if (line[0] === "+") {
          modifiedLines.push(currentLine);
          indexedModifiedLines[currentLine] = true;
        }
        currentLine++;
        remainingLinesInHunk--;
      }
    }
  }

  info(`  File modified lines: ${modifiedLines.join()}`);
  if (file.patch !== undefined) {
    info(
      `  File patch: \n${file.patch
        .split("\n")
        .map((line) => "    " + line)
        .join("\n")}\n`
    );
  }

  return indexedModifiedLines;
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

export async function run(mock: MockConfig | undefined = undefined) {
  const failCheck = mock === undefined ? getBooleanInput("fail-check") : false;
  const requestChanges =
    mock === undefined ? getBooleanInput("request-changes") : false;

  startGroup("ESLint");
  changeDirectory(mock);
  const { eslint, eslintBinPath } = await getESLint(mock);
  const results = await getESLintOutput(mock, eslintBinPath);

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

  startGroup("GitHub Pull Request");
  const octokit = getOctokit(mock);
  const { owner, repo, pullRequestNumber, headSha } =
    await getPullRequestMetadata(mock, octokit);
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
    info(
      `Review submitted: ${reviewComments.length} comment(s) (${
        commentsCounter - reviewComments.length
      } skipped)`
    );
    if (failCheck) {
      throw new Error("ESLint doesn't pass. Please review comments.");
    }
  } else {
    info("ESLint passes");
  }
  endGroup();
}

if (process.argv.length === 6) {
  run({
    token: process.argv[2],
    owner: process.argv[3],
    repo: process.argv[4],
    number: parseInt(process.argv[5]),
  });
} else {
  run();
}
