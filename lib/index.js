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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.pullRequestEventHandler = exports.matchReviewComments = exports.getCommentFromFix = exports.getIndexedModifiedLines = exports.getReviewThreads = exports.getReviewComments = exports.getPullRequestFiles = exports.getPullRequestMetadata = exports.getOctokit = exports.getESLintOutput = exports.getESLint = exports.changeDirectory = void 0;
const github_1 = require("@actions/github");
const utils_1 = require("@actions/github/lib/utils");
const core_1 = require("@actions/core");
const plugin_throttling_1 = require("@octokit/plugin-throttling");
const plugin_retry_1 = require("@octokit/plugin-retry");
const node_process_1 = __importDefault(require("node:process"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const module_1 = require("module");
const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
const WORKING_DIRECTORY = node_process_1.default.cwd();
const REVIEW_BODY = "ESLint doesn't pass. Please fix all ESLint issues.";
function changeDirectory(mock) {
    (0, core_1.info)(`Working directory is: ${WORKING_DIRECTORY}`);
    const absoluteDirectory = node_path_1.default.resolve(WORKING_DIRECTORY, mock === undefined ? (0, core_1.getInput)("directory") : "./");
    (0, core_1.info)(`Working directory is changed to: ${absoluteDirectory}`);
    node_process_1.default.chdir(absoluteDirectory);
}
exports.changeDirectory = changeDirectory;
function getESLint(mock) {
    return __awaiter(this, void 0, void 0, function* () {
        const absoluteDirectory = node_path_1.default.resolve(WORKING_DIRECTORY, mock === undefined ? (0, core_1.getInput)("directory") : "./");
        const require = (0, module_1.createRequire)(absoluteDirectory);
        const eslintJsPath = node_path_1.default.resolve(absoluteDirectory, mock === undefined
            ? (0, core_1.getInput)("eslint-lib-path")
            : "./node_modules/eslint/lib/api.js");
        if (!(0, node_fs_1.existsSync)(eslintJsPath)) {
            throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
        }
        (0, core_1.info)(`Using ESLint from: ${eslintJsPath}`);
        const { ESLint } = require(eslintJsPath);
        const eslintConfig = yield new ESLint().calculateConfigForFile("package.json");
        const eslint = new ESLint({ baseConfig: eslintConfig });
        const eslintBinPath = mock === undefined
            ? (0, core_1.getInput)("eslint-bin-path")
            : "./node_modules/.bin/eslint";
        if (!(0, node_fs_1.existsSync)(eslintBinPath)) {
            throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
        }
        (0, core_1.info)(`Using ESLint binary from: ${eslintBinPath}`);
        return { eslint, eslintBinPath };
    });
}
exports.getESLint = getESLint;
function getESLintOutput(mock, eslintBinPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const targets = mock === undefined ? (0, core_1.getInput)("targets") : ".";
        let results = [];
        try {
            const stdout = node_child_process_1.default.execSync(`${eslintBinPath} "${targets}" --no-error-on-unmatched-pattern --format json`);
            results = JSON.parse(stdout.toString());
        }
        catch (error) {
            // Ignore the error.
        }
        return results;
    });
}
exports.getESLintOutput = getESLintOutput;
function getOctokit(mock) {
    const githubToken = (mock === null || mock === void 0 ? void 0 : mock.token) || (0, core_1.getInput)("github-token");
    const Octokit = utils_1.GitHub.plugin(plugin_throttling_1.throttling, plugin_retry_1.retry);
    const octokit = new Octokit((0, utils_1.getOctokitOptions)(githubToken, {
        throttle: {
            onRateLimit: (retryAfter, options) => {
                if (options.request.retryCount === 0) {
                    octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
                    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
                else {
                    octokit.log.error(`Request quota exhausted for request ${options.method} ${options.url}`);
                }
            },
            onSecondaryRateLimit: (retryAfter, options) => {
                if (options.request.retryCount === 0) {
                    octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
                    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
                else {
                    octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
                }
            },
        },
        retry: {
            doNotRetry: ["429"],
        },
    }));
    return octokit;
}
exports.getOctokit = getOctokit;
function getPullRequestMetadata(mock, octokit) {
    return __awaiter(this, void 0, void 0, function* () {
        let pullRequest;
        if (mock) {
            const response = yield octokit.rest.pulls.get({
                owner: mock.owner,
                repo: mock.repo,
                pull_number: mock.number,
            });
            pullRequest = response.data;
        }
        else {
            pullRequest = github_1.context.payload.pull_request;
        }
        const owner = (mock === null || mock === void 0 ? void 0 : mock.owner) || github_1.context.repo.owner;
        const repo = (mock === null || mock === void 0 ? void 0 : mock.repo) || github_1.context.repo.repo;
        const pullRequestNumber = (mock === null || mock === void 0 ? void 0 : mock.number) || pullRequest.number;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        (0, core_1.info)(`Owner: ${owner}`);
        (0, core_1.info)(`Repo: ${repo}`);
        (0, core_1.info)(`Pull request number: ${pullRequestNumber}`);
        (0, core_1.info)(`Base SHA: ${baseSha}`);
        (0, core_1.info)(`Head SHA: ${headSha}`);
        return {
            owner,
            repo,
            pullRequestNumber,
            baseSha,
            headSha,
        };
    });
}
exports.getPullRequestMetadata = getPullRequestMetadata;
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
function getIndexedModifiedLines(file) {
    var _a;
    const modifiedLines = [];
    const indexedModifiedLines = {};
    let currentLine = 0;
    let remainingLinesInHunk = 0;
    const lines = (_a = file.patch) === null || _a === void 0 ? void 0 : _a.split("\n");
    if (lines) {
        for (const line of lines) {
            if (remainingLinesInHunk === 0) {
                const matches = line.match(HUNK_HEADER_PATTERN);
                currentLine = parseInt((matches === null || matches === void 0 ? void 0 : matches[2]) || "1");
                remainingLinesInHunk = parseInt((matches === null || matches === void 0 ? void 0 : matches[4]) || "1");
                if (!currentLine || !remainingLinesInHunk) {
                    throw new Error(`Expecting hunk header in ${file.filename} but seeing ${line}.`);
                }
            }
            else if (line[0] === "-") {
                continue;
            }
            else {
                if (line[0] === "+") {
                    modifiedLines.push(currentLine);
                    indexedModifiedLines[currentLine] = true;
                }
                currentLine++;
                remainingLinesInHunk--;
            }
        }
    }
    (0, core_1.info)(`  File modified lines: ${modifiedLines.join()}`);
    if (file.patch !== undefined) {
        (0, core_1.info)(`  File patch: \n${file.patch
            .split("\n")
            .map((line) => "    " + line)
            .join("\n")}\n`);
    }
    return indexedModifiedLines;
}
exports.getIndexedModifiedLines = getIndexedModifiedLines;
function getCommentFromFix(source, line, fix) {
    const textRange = source.substring(fix.range[0], fix.range[1]);
    const impactedOriginalLines = textRange.split("\n").length;
    const originalLines = source
        .split("\n")
        .slice(line - 1, line - 1 + impactedOriginalLines);
    const replacedSource = source.substring(0, fix.range[0]) +
        fix.text +
        source.substring(fix.range[1]);
    const impactedReplaceLines = fix.text.split("\n").length;
    const replacedLines = replacedSource
        .split("\n")
        .slice(line - 1, line - 1 + impactedReplaceLines);
    (0, core_1.info)("    Fix:\n" +
        "      " +
        `@@ -${line},${impactedOriginalLines} +${impactedReplaceLines} @@\n` +
        `${originalLines.map((line) => "      - " + line).join("\n")}\n` +
        `${replacedLines.map((line) => "      + " + line).join("\n")}`);
    const reviewSuggestion = {
        start_side: impactedOriginalLines === 1 ? undefined : "RIGHT",
        start_line: impactedOriginalLines === 1 ? undefined : line,
        side: "RIGHT",
        line: line + impactedOriginalLines - 1,
        body: "```suggestion\n" + `${replacedLines.join("\n")}\n` + "```\n",
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
function pullRequestEventHandler(mock, indexedResults, ruleMetaDatas) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const failCheck = mock === undefined ? (0, core_1.getBooleanInput)("fail-check") : false;
        const requestChanges = mock === undefined ? (0, core_1.getBooleanInput)("request-changes") : false;
        (0, core_1.startGroup)("GitHub Pull Request");
        const octokit = getOctokit(mock);
        const { owner, repo, pullRequestNumber, headSha } = yield getPullRequestMetadata(mock, octokit);
        const files = yield getPullRequestFiles(owner, repo, pullRequestNumber, octokit);
        const existingReviewComments = yield getReviewComments(owner, repo, pullRequestNumber, octokit);
        const commentNodeIdToReviewThreadMapping = yield getReviewThreads(owner, repo, pullRequestNumber, octokit);
        let commentsCounter = 0;
        const reviewComments = [];
        let matchedReviewCommentNodeIds = {};
        for (const file of files) {
            (0, core_1.info)(`  File name: ${file.filename}`);
            (0, core_1.info)(`  File status: ${file.status}`);
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
                                            ? ""
                                            : reviewSuggestions.start_line + ":"}${reviewSuggestions.line} and ${reviewSuggestion.start_line === undefined
                                            ? ""
                                            : reviewSuggestion.start_line + ":"}${reviewSuggestion.line}`);
                                    }
                                    reviewSuggestions.body += "\n" + reviewSuggestion.body;
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
                                side: "RIGHT",
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
                }
            }
        }
        (0, core_1.endGroup)();
        (0, core_1.startGroup)("Feedback");
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
                    (0, core_1.info)(`Review comment remains ${reviewThread.isResolved ? "resolved" : "unresolved"}: ${reviewComment.url}`);
                }
            }
            else {
                (0, core_1.error)(`Review comment has no associated review thread: ${reviewComment.url}`);
            }
        }
        if (commentsCounter > 0) {
            const response = yield octokit.rest.pulls.createReview({
                owner,
                repo,
                body: REVIEW_BODY,
                pull_number: pullRequestNumber,
                commit_id: headSha,
                event: requestChanges ? "REQUEST_CHANGES" : "COMMENT",
                comments: reviewComments,
            });
            if (response.status !== 200) {
                throw new Error(`Failed to create review with ${reviewComments.length} comment(s).`);
            }
            if (commentsCounter - reviewComments.length > 0) {
                (0, core_1.info)(`Review comments existed and skipped: ${commentsCounter - reviewComments.length}`);
            }
            (0, core_1.info)(`Review comments submitted: ${reviewComments.length}`);
            if (failCheck) {
                throw new Error("ESLint doesn't pass. Please review comments.");
            }
        }
        else {
            (0, core_1.info)("ESLint passes");
        }
        (0, core_1.endGroup)();
    });
}
exports.pullRequestEventHandler = pullRequestEventHandler;
function run(mock = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.startGroup)("ESLint");
        changeDirectory(mock);
        const { eslint, eslintBinPath } = yield getESLint(mock);
        const results = yield getESLintOutput(mock, eslintBinPath);
        const indexedResults = {};
        for (const file of results) {
            const relativePath = node_path_1.default.relative(WORKING_DIRECTORY, file.filePath);
            (0, core_1.info)(`File name: ${relativePath}`);
            indexedResults[relativePath] = file;
            for (const message of file.messages) {
                (0, core_1.info)(`  [${message.severity}] ${message.message} @ ${message.line}`);
                if (message.suggestions) {
                    (0, core_1.info)(`  Suggestions (${message.suggestions.length}):`);
                    for (const suggestion of message.suggestions) {
                        (0, core_1.info)(`    ${suggestion.desc} (${suggestion.messageId})`);
                    }
                }
            }
        }
        const ruleMetaDatas = eslint.getRulesMetaForResults(results);
        (0, core_1.endGroup)();
        switch (github_1.context.eventName) {
            case "pull_request":
                pullRequestEventHandler(mock, indexedResults, ruleMetaDatas);
                break;
            default:
                (0, core_1.error)(`Unsupported GitHub Action event: ${github_1.context.eventName}`);
                return;
        }
    });
}
exports.run = run;
if (node_process_1.default.argv.length === 6) {
    run({
        token: node_process_1.default.argv[2],
        owner: node_process_1.default.argv[3],
        repo: node_process_1.default.argv[4],
        number: parseInt(node_process_1.default.argv[5]),
    });
}
else {
    run();
}
