"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommit = handleCommit;
const node_path_1 = __importDefault(require("node:path"));
const core_1 = require("@actions/core");
const changeDirectory_1 = require("./changeDirectory");
function handleCommit(eventName, results, ruleMetaDatas) {
    const failCheck = (0, core_1.getBooleanInput)('fail-check');
    (0, core_1.startGroup)(`GitHub ${eventName}`);
    let warningCounter = 0;
    let errorCounter = 0;
    for (const result of results) {
        const relativePath = node_path_1.default.relative(changeDirectory_1.DEFAULT_WORKING_DIRECTORY, result.filePath);
        for (const message of result.messages) {
            if (message.ruleId === null || result.source === undefined) {
                continue;
            }
            const rule = ruleMetaDatas[message.ruleId];
            (0, core_1.info)(`  ${relativePath}:${message.line}`);
            switch (message.severity) {
                case 0:
                    (0, core_1.notice)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    break;
                case 1:
                    (0, core_1.warning)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    warningCounter++;
                    break;
                case 2:
                    (0, core_1.error)(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    errorCounter++;
                    break;
            }
        }
    }
    (0, core_1.endGroup)();
    (0, core_1.startGroup)('Feedback');
    if (warningCounter > 0 || errorCounter > 0) {
        if (failCheck) {
            throw new Error('ESLint fails.');
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
