"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPushMetadata = void 0;
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
function getPushMetadata() {
    const push = github_1.context.payload;
    const owner = github_1.context.repo.owner;
    const repo = github_1.context.repo.repo;
    const beforeSha = push.before;
    const afterSha = push.after;
    (0, core_1.info)(`Owner: ${owner}`);
    (0, core_1.info)(`Repo: ${repo}`);
    (0, core_1.info)(`Before SHA: ${beforeSha}`);
    (0, core_1.info)(`After SHA: ${afterSha}`);
    return {
        owner,
        repo,
        beforeSha,
        afterSha,
    };
}
exports.getPushMetadata = getPushMetadata;
