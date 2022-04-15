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
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const githubToken = (0, core_1.getInput)("github-token");
        const octokit = (0, github_1.getOctokit)(githubToken);
        const pullRequest = github_1.context.payload.pull_request;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        (0, core_1.info)(`Repo: ${github_1.context.repo.repo}`);
        (0, core_1.info)(`Owner: ${github_1.context.repo.owner}`);
        (0, core_1.info)(`Pull request number: ${pullRequest.number}`);
        (0, core_1.info)(`Base SHA: ${baseSha}`);
        (0, core_1.info)(`Head SHA: ${headSha}`);
        yield octokit.rest.pulls.createReviewComment(Object.assign(Object.assign({}, github_1.context.repo), { body: "Test comment from action", pull_number: pullRequest.number, commit_id: headSha }));
    });
}
run();
