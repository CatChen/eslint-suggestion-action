import path from 'node:path';
import { endGroup, error, getBooleanInput, info, notice, startGroup, warning, } from '@actions/core';
import { DEFAULT_WORKING_DIRECTORY } from './changeDirectory.js';
export function handleCommit(eventName, results, ruleMetaDatas) {
    const failCheck = getBooleanInput('fail-check');
    startGroup(`GitHub ${eventName}`);
    let warningCounter = 0;
    let errorCounter = 0;
    for (const result of results) {
        const relativePath = path.relative(DEFAULT_WORKING_DIRECTORY, result.filePath);
        for (const message of result.messages) {
            if (message.ruleId === null || result.source === undefined) {
                continue;
            }
            const rule = ruleMetaDatas[message.ruleId];
            info(`  ${relativePath}:${message.line}`);
            switch (message.severity) {
                case 0:
                    notice(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    break;
                case 1:
                    warning(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    warningCounter++;
                    break;
                case 2:
                    error(`[${message.ruleId}]${message.message}: (${rule?.docs?.url})`, {
                        file: relativePath,
                        startLine: message.line,
                    });
                    errorCounter++;
                    break;
            }
        }
    }
    endGroup();
    startGroup('Feedback');
    if (warningCounter > 0 || errorCounter > 0) {
        if (failCheck) {
            throw new Error('ESLint fails.');
        }
        else {
            error('ESLint fails');
        }
    }
    else {
        notice('ESLint passes');
    }
    endGroup();
}
