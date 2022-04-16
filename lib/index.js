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
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const node_process_1 = __importDefault(require("node:process"));
function run(mock = undefined) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const githubToken = ((_a = mock) === null || _a === void 0 ? void 0 : _a.token) || core_1.getInput("github-token");
        const octokit = github_1.getOctokit(githubToken);
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
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        core_1.info(`Owner: ${((_b = mock) === null || _b === void 0 ? void 0 : _b.owner) || github_1.context.repo.owner}`);
        core_1.info(`Repo: ${((_c = mock) === null || _c === void 0 ? void 0 : _c.repo) || github_1.context.repo.repo}`);
        core_1.info(`Pull request number: ${((_d = mock) === null || _d === void 0 ? void 0 : _d.number) || pullRequest.number}`);
        core_1.info(`Base SHA: ${baseSha}`);
        core_1.info(`Head SHA: ${headSha}`);
        const files = yield octokit.rest.pulls.listFiles(Object.assign(Object.assign({}, github_1.context.repo), { pull_number: pullRequest.number }));
        core_1.info(`Files: ${files.data.length}`);
        files.data.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            core_1.info(`File name: ${file.filename}`);
            core_1.info(`File state: ${file.status}`);
            yield octokit.rest.pulls.createReviewComment(Object.assign(Object.assign({}, github_1.context.repo), { body: "Test comment from action", pull_number: pullRequest.number, commit_id: headSha, path: file.filename, position: 1 }));
        }));
    });
}
console.log(node_process_1.default.argv);
run();
