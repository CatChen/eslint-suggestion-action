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
exports.getPushMetadata = void 0;
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
function getPushMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.getPushMetadata = getPushMetadata;
