"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const node_path_1 = __importDefault(require("node:path"));
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const changeDirectory_js_1 = require("./changeDirectory.js");
const commit_js_1 = require("./commit.js");
const getESLint_js_1 = require("./getESLint.js");
const getESLintResults_js_1 = require("./getESLintResults.js");
const getOctokit_js_1 = require("./getOctokit.js");
const getPullRequestMetadata_js_1 = require("./getPullRequestMetadata.js");
const getPushMetadata_js_1 = require("./getPushMetadata.js");
const pullRequest_js_1 = require("./pullRequest.js");
const push_js_1 = require("./push.js");
async function run() {
    (0, core_1.startGroup)('ESLint');
    (0, changeDirectory_js_1.changeDirectory)();
    const eslint = await (0, getESLint_js_1.getESLint)();
    const results = await (0, getESLintResults_js_1.getESLintResults)(eslint);
    const indexedResults = {};
    for (const file of results) {
        const relativePath = node_path_1.default.relative(changeDirectory_js_1.DEFAULT_WORKING_DIRECTORY, file.filePath);
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
    const ruleMetaData = eslint.getRulesMetaForResults(results);
    (0, core_1.endGroup)();
    const githubToken = (0, core_1.getInput)('github-token');
    const octokit = (0, getOctokit_js_1.getOctokit)(githubToken);
    (0, core_1.info)(`Event name: ${github_1.context.eventName}`);
    switch (github_1.context.eventName) {
        case 'pull_request':
        case 'pull_request_target':
            await (async () => {
                const { owner, repo, pullRequestNumber, baseSha, headSha } = (0, getPullRequestMetadata_js_1.getPullRequestMetadata)();
                await (0, pullRequest_js_1.handlePullRequest)(octokit, indexedResults, ruleMetaData, owner, repo, pullRequestNumber, baseSha, headSha);
            })();
            break;
        case 'push':
            await (async () => {
                const { owner, repo, beforeSha, afterSha } = (0, getPushMetadata_js_1.getPushMetadata)();
                await (0, push_js_1.handlePush)(octokit, indexedResults, ruleMetaData, owner, repo, beforeSha, afterSha);
            })();
            break;
        case 'workflow_run':
            await (async () => {
                const workflowRun = github_1.context.payload;
                if (workflowRun.workflow_run.pull_requests.length > 0) {
                    for (const pullRequest of workflowRun.workflow_run.pull_requests) {
                        const { owner, repo, pullRequestNumber, baseSha, headSha } = await (0, getPullRequestMetadata_js_1.getPullRequestMetadataByNumber)(octokit, pullRequest.number);
                        await (0, pullRequest_js_1.handlePullRequest)(octokit, indexedResults, ruleMetaData, owner, repo, pullRequestNumber, baseSha, headSha);
                    }
                }
                else {
                    const workflowSourceEventName = workflowRun.workflow_run.event
                        .split('_')
                        .map((word) => word[0]?.toUpperCase() + word.substring(1))
                        .join(' ');
                    (0, commit_js_1.handleCommit)(`Workflow (${workflowSourceEventName})`, results, ruleMetaData);
                }
            })();
            break;
        default:
            (0, commit_js_1.handleCommit)(github_1.context.eventName
                .split('_')
                .map((word) => word[0]?.toUpperCase() + word.substring(1))
                .join(' '), results, ruleMetaData);
            break;
    }
}
run().catch((error) => (0, core_1.setFailed)(error));
