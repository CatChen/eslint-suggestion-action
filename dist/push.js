"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePush = handlePush;
const core_1 = require("@actions/core");
const getIndexedModifiedLines_js_1 = require("./getIndexedModifiedLines.js");
async function getPushFiles(octokit, owner, repo, beforeSha, afterSha) {
    const response = await octokit.rest.repos.compareCommitsWithBasehead({
        owner,
        repo,
        basehead: `${beforeSha}...${afterSha}`,
    });
    (0, core_1.info)(`Files: (${response.data.files?.length ?? 0})`);
    return response.data.files;
}
async function handlePush(octokit, indexedResults, ruleMetaDatas, owner, repo, beforeSha, afterSha) {
    const failCheck = (0, core_1.getBooleanInput)('fail-check');
    (0, core_1.startGroup)('GitHub Push');
    const files = await getPushFiles(octokit, owner, repo, beforeSha, afterSha);
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
        const indexedModifiedLines = (0, getIndexedModifiedLines_js_1.getIndexedModifiedLines)(file);
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
                            (0, core_1.notice)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                                file: file.filename,
                                startLine: message.line,
                            });
                            break;
                        case 1:
                            (0, core_1.warning)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                                file: file.filename,
                                startLine: message.line,
                            });
                            warningCounter++;
                            break;
                        case 2:
                            (0, core_1.error)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
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
}
