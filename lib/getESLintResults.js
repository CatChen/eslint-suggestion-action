"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLintResults = getESLintResults;
const core_1 = require("@actions/core");
const glob_1 = require("glob");
async function getESLintResults(eslint) {
    const targets = (0, core_1.getInput)('targets');
    return eslint.lintFiles(targets ? (0, glob_1.sync)(targets) : []);
}
