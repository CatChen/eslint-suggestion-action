"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexedModifiedLines = void 0;
const core_1 = require("@actions/core");
const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
function getIndexedModifiedLines(file) {
    var _a;
    const modifiedLines = [];
    const indexedModifiedLines = {};
    let currentLine = 0;
    let remainingLinesInHunk = 0;
    const lines = (_a = file.patch) === null || _a === void 0 ? void 0 : _a.split("\n");
    if (lines) {
        for (const line of lines) {
            if (remainingLinesInHunk === 0) {
                const matches = line.match(HUNK_HEADER_PATTERN);
                currentLine = parseInt((matches === null || matches === void 0 ? void 0 : matches[2]) || "1");
                remainingLinesInHunk = parseInt((matches === null || matches === void 0 ? void 0 : matches[4]) || "1");
                if (!currentLine || !remainingLinesInHunk) {
                    throw new Error(`Expecting hunk header in ${file.filename} but seeing ${line}.`);
                }
            }
            else if (line[0] === "-") {
                continue;
            }
            else {
                if (line[0] === "+") {
                    modifiedLines.push(currentLine);
                    indexedModifiedLines[currentLine] = true;
                }
                currentLine++;
                remainingLinesInHunk--;
            }
        }
    }
    (0, core_1.info)(`  File modified lines: ${modifiedLines.join()}`);
    if (file.patch !== undefined) {
        (0, core_1.info)(`  File patch: \n${file.patch
            .split("\n")
            .map((line) => "    " + line)
            .join("\n")}\n`);
    }
    return indexedModifiedLines;
}
exports.getIndexedModifiedLines = getIndexedModifiedLines;
