"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePullRequest = exports.matchReviewComments = exports.getCommentFromFix = exports.getReviewThreads = exports.getReviewComments = exports.getPullRequestFiles = void 0;
const core_1 = require("@actions/core");
const getIndexedModifiedLines_1 = require("./getIndexedModifiedLines");
const getOctokit_1 = require("./getOctokit");
const REVIEW_BODY = "ESLint doesn't pass. Please fix all ESLint issues.";
function getPullRequestFiles(owner, repo, pullRequestNumber, octokit) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: pullRequestNumber,
        });
        (0, core_1.info)(`Files: (${response.data.length})`);
        return response.data;
    });
}
exports.getPullRequestFiles = getPullRequestFiles;
function getReviewComments(owner, repo, pullRequestNumber, octokit) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield octokit.rest.pulls.listReviews({
            owner,
            repo,
            pull_number: pullRequestNumber,
        });
        const reviewComments = yield octokit.rest.pulls.listReviewComments({
            owner,
            repo,
            pull_number: pullRequestNumber,
        });
        const relevantReviews = reviews.data.filter((review) => { var _a; return ((_a = review.user) === null || _a === void 0 ? void 0 : _a.id) === 41898282 && review.body === REVIEW_BODY; });
        const relevantReviewIds = relevantReviews.map((review) => review.id);
        const relevantReviewComments = reviewComments.data.filter((reviewComment) => reviewComment.user.id === 41898282 &&
            reviewComment.pull_request_review_id !== null &&
            relevantReviewIds.includes(reviewComment.pull_request_review_id));
        (0, core_1.info)(`Existing review comments: (${relevantReviewComments.length})`);
        return relevantReviewComments;
    });
}
exports.getReviewComments = getReviewComments;
function getReviewThreads(owner, repo, pullRequestNumber, octokit) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        const commentNodeIdToReviewThreadMapping = {};
        const queryData = yield octokit.graphql(`
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
    `, {
            owner,
            repo,
            pullRequestNumber,
        });
        const reviewThreadTotalCount = (_c = (_b = (_a = queryData === null || queryData === void 0 ? void 0 : queryData.repository) === null || _a === void 0 ? void 0 : _a.pullRequest) === null || _b === void 0 ? void 0 : _b.reviewThreads) === null || _c === void 0 ? void 0 : _c.totalCount;
        if (reviewThreadTotalCount !== undefined && reviewThreadTotalCount > 100) {
            (0, core_1.error)(`There are more than 100 review threads: ${reviewThreadTotalCount}`);
        }
        const reviewThreads = (_f = (_e = (_d = queryData === null || queryData === void 0 ? void 0 : queryData.repository) === null || _d === void 0 ? void 0 : _d.pullRequest) === null || _e === void 0 ? void 0 : _e.reviewThreads) === null || _f === void 0 ? void 0 : _f.nodes;
        if (reviewThreads !== undefined && reviewThreads !== null) {
            for (const reviewThread of reviewThreads) {
                if (reviewThread === null) {
                    continue;
                }
                const commentTotalCount = (_g = reviewThread === null || reviewThread === void 0 ? void 0 : reviewThread.comments) === null || _g === void 0 ? void 0 : _g.totalCount;
                if (commentTotalCount !== undefined && commentTotalCount > 100) {
                    (0, core_1.error)(`There are more than 100 review comments in review thread ${reviewThread === null || reviewThread === void 0 ? void 0 : reviewThread.id}: ${commentTotalCount}`);
                }
                const comments = (_h = reviewThread === null || reviewThread === void 0 ? void 0 : reviewThread.comments) === null || _h === void 0 ? void 0 : _h.nodes;
                if (comments !== undefined && comments !== null) {
                    for (const comment of comments) {
                        const commentId = comment === null || comment === void 0 ? void 0 : comment.id;
                        if (commentId === undefined) {
                            continue;
                        }
                        commentNodeIdToReviewThreadMapping[commentId] = reviewThread;
                    }
                }
            }
        }
        return commentNodeIdToReviewThreadMapping;
    });
}
exports.getReviewThreads = getReviewThreads;
function getCommentFromFix(source, line, fix) {
    const textRange = source.substring(fix.range[0], fix.range[1]);
    const impactedOriginalLines = textRange.split('\n').length;
    const originalLines = source
        .split('\n')
        .slice(line - 1, line - 1 + impactedOriginalLines);
    const replacedSource = source.substring(0, fix.range[0]) +
        fix.text +
        source.substring(fix.range[1]);
    const impactedReplaceLines = fix.text.split('\n').length;
    const replacedLines = replacedSource
        .split('\n')
        .slice(line - 1, line - 1 + impactedReplaceLines);
    (0, core_1.info)('    Fix:\n' +
        '      ' +
        `@@ -${line},${impactedOriginalLines} +${impactedReplaceLines} @@\n` +
        `${originalLines.map((line) => '      - ' + line).join('\n')}\n` +
        `${replacedLines.map((line) => '      + ' + line).join('\n')}`);
    const reviewSuggestion = {
        start_side: impactedOriginalLines === 1 ? undefined : 'RIGHT',
        start_line: impactedOriginalLines === 1 ? undefined : line,
        side: 'RIGHT',
        line: line + impactedOriginalLines - 1,
        body: '```suggestion\n' + `${replacedLines.join('\n')}\n` + '```\n',
    };
    return reviewSuggestion;
}
exports.getCommentFromFix = getCommentFromFix;
function matchReviewComments(reviewComments, reviewComment) {
    const matchedNodeIds = [];
    for (const existingReviewComment of reviewComments) {
        if (existingReviewComment.path === reviewComment.path &&
            existingReviewComment.line === reviewComment.line &&
            existingReviewComment.side === reviewComment.side &&
            existingReviewComment.start_line == reviewComment.start_line && // null-undefined comparison
            existingReviewComment.start_side == reviewComment.start_side && // null-undefined comparison
            existingReviewComment.body === reviewComment.body) {
            matchedNodeIds.push(existingReviewComment.node_id);
        }
    }
    return matchedNodeIds;
}
exports.matchReviewComments = matchReviewComments;
function handlePullRequest(indexedResults, ruleMetaDatas, owner, repo, pullRequestNumber, baseSha, headSha) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const failCheck = (0, core_1.getBooleanInput)('fail-check');
        const requestChanges = (0, core_1.getBooleanInput)('request-changes');
        (0, core_1.startGroup)('GitHub Pull Request');
        const octokit = (0, getOctokit_1.getOctokit)();
        const files = yield getPullRequestFiles(owner, repo, pullRequestNumber, octokit);
        const existingReviewComments = yield getReviewComments(owner, repo, pullRequestNumber, octokit);
        const commentNodeIdToReviewThreadMapping = yield getReviewThreads(owner, repo, pullRequestNumber, octokit);
        let commentsCounter = 0;
        let outOfScopeResultsCounter = 0;
        const reviewComments = [];
        let matchedReviewCommentNodeIds = {};
        for (const file of files) {
            (0, core_1.info)(`  File name: ${file.filename}`);
            (0, core_1.info)(`  File status: ${file.status}`);
            if (file.status === 'removed') {
                continue;
            }
            const indexedModifiedLines = (0, getIndexedModifiedLines_1.getIndexedModifiedLines)(file);
            const result = indexedResults[file.filename];
            if (result) {
                for (const message of result.messages) {
                    if (message.ruleId === null || result.source === undefined) {
                        continue;
                    }
                    const rule = ruleMetaDatas[message.ruleId];
                    if (indexedModifiedLines[message.line]) {
                        (0, core_1.info)(`  Matched line: ${message.line}`);
                        if (message.fix) {
                            const reviewSuggestion = getCommentFromFix(result.source, message.line, message.fix);
                            const reviewComment = Object.assign(Object.assign({}, reviewSuggestion), { body: `**${message.message}** [${message.ruleId}](${(_a = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _a === void 0 ? void 0 : _a.url})\n\nFix available:\n\n` +
                                    reviewSuggestion.body, path: file.filename });
                            const matchedComments = matchReviewComments(existingReviewComments, reviewComment);
                            commentsCounter++;
                            if (matchedComments.length === 0) {
                                reviewComments.push(reviewComment);
                                (0, core_1.info)(`    Comment queued`);
                            }
                            else {
                                matchedReviewCommentNodeIds = Object.assign(Object.assign({}, matchedReviewCommentNodeIds), Object.fromEntries(matchedComments.map((nodeId) => [nodeId, true])));
                                (0, core_1.info)(`    Comment skipped`);
                            }
                        }
                        else if (message.suggestions) {
                            let reviewSuggestions = undefined;
                            for (const suggestion of message.suggestions) {
                                const reviewSuggestion = getCommentFromFix(result.source, message.line, suggestion.fix);
                                if (reviewSuggestions === undefined) {
                                    reviewSuggestions = Object.assign({}, reviewSuggestion);
                                }
                                else {
                                    if (reviewSuggestion.start_line !==
                                        reviewSuggestions.start_line ||
                                        reviewSuggestion.line !== reviewSuggestions.line) {
                                        (0, core_1.error)(`    Suggestions have mismatched line(s): ${reviewSuggestions.start_line === undefined
                                            ? ''
                                            : reviewSuggestions.start_line + ':'}${reviewSuggestions.line} and ${reviewSuggestion.start_line === undefined
                                            ? ''
                                            : reviewSuggestion.start_line + ':'}${reviewSuggestion.line}`);
                                    }
                                    reviewSuggestions.body += '\n' + reviewSuggestion.body;
                                }
                            }
                            if (reviewSuggestions !== undefined) {
                                const reviewComment = Object.assign(Object.assign({}, reviewSuggestions), { body: `**${message.message}** [${message.ruleId}](${(_b = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _b === void 0 ? void 0 : _b.url})\n\nSuggestion(s) available:\n\n` +
                                        reviewSuggestions.body, path: file.filename });
                                const matchedComments = matchReviewComments(existingReviewComments, reviewComment);
                                commentsCounter++;
                                if (matchedComments.length === 0) {
                                    reviewComments.push(reviewComment);
                                    (0, core_1.info)(`    Comment queued`);
                                }
                                else {
                                    matchedReviewCommentNodeIds = Object.assign(Object.assign({}, matchedReviewCommentNodeIds), Object.fromEntries(matchedComments.map((nodeId) => [nodeId, true])));
                                    (0, core_1.info)(`    Comment skipped`);
                                }
                            }
                        }
                        else {
                            const reviewComment = {
                                body: `**${message.message}** [${message.ruleId}](${(_c = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _c === void 0 ? void 0 : _c.url})`,
                                path: file.filename,
                                side: 'RIGHT',
                                line: message.line,
                            };
                            const matchedComments = matchReviewComments(existingReviewComments, reviewComment);
                            commentsCounter++;
                            if (matchedComments.length === 0) {
                                reviewComments.push(reviewComment);
                                (0, core_1.info)(`    Comment queued`);
                            }
                            else {
                                matchedReviewCommentNodeIds = Object.assign(Object.assign({}, matchedReviewCommentNodeIds), Object.fromEntries(matchedComments.map((nodeId) => [nodeId, true])));
                                (0, core_1.info)(`    Comment skipped`);
                            }
                        }
                    }
                    else {
                        (0, core_1.info)(`  Out of scope line: ${message.line}`);
                        outOfScopeResultsCounter++;
                    }
                }
            }
        }
        (0, core_1.endGroup)();
        (0, core_1.startGroup)('Feedback');
        for (const reviewComment of existingReviewComments) {
            const reviewThread = commentNodeIdToReviewThreadMapping[reviewComment.node_id];
            if (reviewThread !== undefined) {
                if (matchedReviewCommentNodeIds[reviewComment.node_id] &&
                    reviewThread.isResolved) {
                    octokit.graphql(`
            mutation ($nodeId: ID!) {
              unresolveReviewThread(input: {threadId: $nodeId}) {
                thread {
                  id
                }
              }
            }
          `, {
                        nodeId: reviewThread.id,
                    });
                    (0, core_1.info)(`Review comment unresolved: ${reviewComment.url}`);
                }
                else if (!matchedReviewCommentNodeIds[reviewComment.node_id] &&
                    !reviewThread.isResolved) {
                    octokit.graphql(`
            mutation ($nodeId: ID!) {
              resolveReviewThread(input: {threadId: $nodeId}) {
                thread {
                  id
                }
              }
            }
          `, {
                        nodeId: reviewThread.id,
                    });
                    (0, core_1.info)(`Review comment resolved: ${reviewComment.url}`);
                }
                else {
                    (0, core_1.info)(`Review comment remains ${reviewThread.isResolved ? 'resolved' : 'unresolved'}: ${reviewComment.url}`);
                }
            }
            else {
                (0, core_1.error)(`Review comment has no associated review thread: ${reviewComment.url}`);
            }
        }
        if (outOfScopeResultsCounter > 0) {
            (0, core_1.info)(`Out of scope results: ${outOfScopeResultsCounter}`);
        }
        if (commentsCounter > 0) {
            try {
                yield octokit.rest.pulls.createReview({
                    owner,
                    repo,
                    body: REVIEW_BODY,
                    pull_number: pullRequestNumber,
                    commit_id: headSha,
                    event: requestChanges ? 'REQUEST_CHANGES' : 'COMMENT',
                    comments: reviewComments,
                });
            }
            catch (error) {
                throw new Error(`Failed to create review with ${reviewComments.length} comment(s).`);
            }
            if (commentsCounter - reviewComments.length > 0) {
                (0, core_1.info)(`Review comments existed and skipped: ${commentsCounter - reviewComments.length}`);
            }
            (0, core_1.info)(`Review comments submitted: ${reviewComments.length}`);
            if (failCheck) {
                throw new Error('ESLint fails. Please review comments.');
            }
            else {
                (0, core_1.error)('ESLint fails');
            }
        }
        else {
            (0, core_1.notice)('ESLint passes');
        }
        (0, core_1.endGroup)();
    });
}
exports.handlePullRequest = handlePullRequest;
