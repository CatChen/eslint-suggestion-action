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
const github_1 = __importDefault(require("@actions/github"));
const core_1 = __importDefault(require("@actions/core"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const githubToken = core_1.default.getInput("github-token");
        const octokit = github_1.default.getOctokit(githubToken);
        const context = github_1.default.context;
        const pullRequest = context.payload.pull_request;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        core_1.default.info(`Pull request number: ${pullRequest.number}`);
        core_1.default.info(`Base SHA: ${baseSha}`);
        core_1.default.info(`Head SHA: ${headSha}`);
        yield octokit.rest.pulls.createReviewComment(Object.assign(Object.assign({}, context.repo), { body: "Test comment from action", pull_number: pullRequest.number, commit_id: headSha }));
    });
}
run();
