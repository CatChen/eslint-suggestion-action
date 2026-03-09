import { info } from '@actions/core';

const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;

export function getIndexedModifiedLines(patch: string | undefined): {
  [line: string]: true;
} {
  const modifiedLines = [];
  const indexedModifiedLines: { [line: string]: true } = {};
  let currentLine = 0;
  let remainingLinesInHunk = 0;
  const lines = patch?.split('\n');
  if (lines) {
    for (const line of lines) {
      if (remainingLinesInHunk === 0) {
        const matches = line.match(HUNK_HEADER_PATTERN);
        if (!matches) {
          continue;
        }
        currentLine = parseInt(matches[2] || '1');
        remainingLinesInHunk = parseInt(matches[4] || '1');
        if (Number.isNaN(currentLine) || Number.isNaN(remainingLinesInHunk)) {
          throw new Error(`Unable to parse hunk header from line: ${line}.`);
        }
      } else if (line[0] === '-') {
        continue;
      } else if (line[0] === '\\') {
        continue;
      } else {
        if (line[0] === '+') {
          modifiedLines.push(currentLine);
          indexedModifiedLines[currentLine] = true;
        }
        currentLine++;
        remainingLinesInHunk--;
      }
    }
  }

  info(`  File modified lines: ${modifiedLines.join()}`);
  if (patch !== undefined) {
    info(
      `  File patch: \n${patch
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n')}\n`,
    );
  }

  return indexedModifiedLines;
}
