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
exports.run = void 0;
const node_path_1 = __importDefault(require("node:path"));
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const changeDirectory_1 = require("./changeDirectory");
const commit_1 = require("./commit");
const getESLint_1 = require("./getESLint");
const getESLintResults_1 = require("./getESLintResults");
const getPullRequestMetadata_1 = require("./getPullRequestMetadata");
const getPushMetadata_1 = require("./getPushMetadata");
const pullRequest_1 = require("./pullRequest");
const push_1 = require("./push");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.startGroup)('ESLint');
        (0, changeDirectory_1.changeDirectory)();
        const eslint = yield (0, getESLint_1.getESLint)();
        const results = yield (0, getESLintResults_1.getESLintResults)(eslint);
        const indexedResults = {};
        for (const file of results) {
            const relativePath = node_path_1.default.relative(changeDirectory_1.DEFAULT_WORKING_DIRECTORY, file.filePath);
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
        (0, core_1.info)(`Event name: ${github_1.context.eventName}`);
        switch (github_1.context.eventName) {
            case 'pull_request':
            case 'pull_request_target':
                yield (() => __awaiter(this, void 0, void 0, function* () {
                    const { owner, repo, pullRequestNumber, baseSha, headSha } = yield (0, getPullRequestMetadata_1.getPullRequestMetadata)();
                    yield (0, pullRequest_1.handlePullRequest)(indexedResults, ruleMetaData, owner, repo, pullRequestNumber, baseSha, headSha);
                }))();
                break;
            case 'push':
                yield (() => __awaiter(this, void 0, void 0, function* () {
                    const { owner, repo, beforeSha, afterSha } = yield (0, getPushMetadata_1.getPushMetadata)();
                    yield (0, push_1.handlePush)(indexedResults, ruleMetaData, owner, repo, beforeSha, afterSha);
                }))();
                break;
            case 'workflow_run':
                yield (() => __awaiter(this, void 0, void 0, function* () {
                    const workflowRun = github_1.context.payload;
                    if (workflowRun.workflow_run.pull_requests.length > 0) {
                        for (const pullRequest of workflowRun.workflow_run.pull_requests) {
                            const { owner, repo, pullRequestNumber, baseSha, headSha } = yield (0, getPullRequestMetadata_1.getPullRequestMetadataByNumber)(pullRequest.number);
                            yield (0, pullRequest_1.handlePullRequest)(indexedResults, ruleMetaData, owner, repo, pullRequestNumber, baseSha, headSha);
                        }
                    }
                    else {
                        const workflowSourceEventName = workflowRun.workflow_run.event
                            .split('_')
                            .map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); })
                            .join(' ');
                        yield (0, commit_1.handleCommit)(`Workflow (${workflowSourceEventName})`, results, ruleMetaData);
                    }
                }))();
                break;
            default:
                (0, commit_1.handleCommit)(github_1.context.eventName
                    .split('_')
                    .map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); })
                    .join(' '), results, ruleMetaData);
                break;
        }
    });
}
exports.run = run;
run();
