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
exports.getPullRequestMetadataByNumber = exports.getPullRequestMetadata = void 0;
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const getOctokit_1 = require("./getOctokit");
function getPullRequestMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
        const pullRequest = github_1.context.payload.pull_request;
        const owner = github_1.context.repo.owner;
        const repo = github_1.context.repo.repo;
        const pullRequestNumber = pullRequest.number;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        (0, core_1.info)(`Owner: ${owner}`);
        (0, core_1.info)(`Repo: ${repo}`);
        (0, core_1.info)(`Pull Request number: ${pullRequestNumber}`);
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
function getPullRequestMetadataByNumber(pullRequestNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = (0, getOctokit_1.getOctokit)();
        const owner = github_1.context.repo.owner;
        const repo = github_1.context.repo.repo;
        const response = yield octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: pullRequestNumber,
        });
        const pullRequest = response.data;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        (0, core_1.info)(`Owner: ${owner}`);
        (0, core_1.info)(`Repo: ${repo}`);
        (0, core_1.info)(`Pull Request number: ${pullRequestNumber}`);
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
exports.getPullRequestMetadataByNumber = getPullRequestMetadataByNumber;
