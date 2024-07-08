"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexedModifiedLines = getIndexedModifiedLines;
const core_1 = require("@actions/core");
const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
function getIndexedModifiedLines(file) {
    const modifiedLines = [];
    const indexedModifiedLines = {};
    let currentLine = 0;
    let remainingLinesInHunk = 0;
    const lines = file.patch?.split('\n');
    if (lines) {
        for (const line of lines) {
            if (remainingLinesInHunk === 0) {
                const matches = line.match(HUNK_HEADER_PATTERN);
                currentLine = parseInt(matches?.[2] || '1');
                remainingLinesInHunk = parseInt(matches?.[4] || '1');
                if (!currentLine || !remainingLinesInHunk) {
                    throw new Error(`Expecting hunk header in ${file.filename} but seeing ${line}.`);
                }
            }
            else if (line[0] === '-') {
                continue;
            }
            else {
                if (line[0] === '+') {
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
            .split('\n')
            .map((line) => '    ' + line)
            .join('\n')}\n`);
    }
    return indexedModifiedLines;
}
