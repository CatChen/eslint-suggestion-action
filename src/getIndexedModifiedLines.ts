import type { components } from '@octokit/openapi-types/types.js';
import { info } from '@actions/core';

const HUNK_HEADER_PATTERN = /^@@ -\d+(,\d+)? \+(\d+)(,(\d+))? @@/;

export function getIndexedModifiedLines(
  file: components['schemas']['diff-entry'],
): {
  [line: string]: true;
} {
  const modifiedLines = [];
  const indexedModifiedLines: { [line: string]: true } = {};
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
          throw new Error(
            `Expecting hunk header in ${file.filename} but seeing ${line}.`,
          );
        }
      } else if (line[0] === '-') {
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
  if (file.patch !== undefined) {
    info(
      `  File patch: \n${file.patch
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n')}\n`,
    );
  }

  return indexedModifiedLines;
}
