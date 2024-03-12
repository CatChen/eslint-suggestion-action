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
exports.handlePush = exports.getPushFiles = void 0;
const core_1 = require("@actions/core");
const getIndexedModifiedLines_1 = require("./getIndexedModifiedLines");
const getOctokit_1 = require("./getOctokit");
function getPushFiles(owner, repo, beforeSha, afterSha, octokit) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const response = yield octokit.rest.repos.compareCommitsWithBasehead({
            owner,
            repo,
            basehead: `${beforeSha}...${afterSha}`,
        });
        (0, core_1.info)(`Files: (${(_b = (_a = response.data.files) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0})`);
        return response.data.files;
    });
}
exports.getPushFiles = getPushFiles;
function handlePush(indexedResults, ruleMetaDatas, owner, repo, beforeSha, afterSha) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const failCheck = (0, core_1.getBooleanInput)('fail-check');
        (0, core_1.startGroup)('GitHub Push');
        const octokit = (0, getOctokit_1.getOctokit)();
        const files = yield getPushFiles(owner, repo, beforeSha, afterSha, octokit);
        if (files === undefined || files.length === 0) {
            (0, core_1.info)(`Push contains no files`);
            return;
        }
        let warningCounter = 0;
        let errorCounter = 0;
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
                        switch (message.severity) {
                            case 0:
                                (0, core_1.notice)(`[${message.ruleId}]${message.message}: (${(_a = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _a === void 0 ? void 0 : _a.url})`, {
                                    file: file.filename,
                                    startLine: message.line,
                                });
                                break;
                            case 1:
                                (0, core_1.warning)(`[${message.ruleId}]${message.message}: (${(_b = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _b === void 0 ? void 0 : _b.url})`, {
                                    file: file.filename,
                                    startLine: message.line,
                                });
                                warningCounter++;
                                break;
                            case 2:
                                (0, core_1.error)(`[${message.ruleId}]${message.message}: (${(_c = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _c === void 0 ? void 0 : _c.url})`, {
                                    file: file.filename,
                                    startLine: message.line,
                                });
                                errorCounter++;
                                break;
                        }
                    }
                }
            }
        }
        (0, core_1.endGroup)();
        (0, core_1.startGroup)('Feedback');
        if (warningCounter > 0 || errorCounter > 0) {
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
exports.handlePush = handlePush;
