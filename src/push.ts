import type { ESLint, Rule } from 'eslint';
import {
  endGroup,
  error,
  info,
  notice,
  startGroup,
  warning,
} from '@actions/core';
import { formatAnnotationMessage } from './formatLintMessage.js';
import { getIndexedModifiedLines } from './getIndexedModifiedLines.js';
import { getPushFiles } from './getPushFiles.js';

const ZERO_SHA = '0000000000000000000000000000000000000000';

export async function handlePush(
  indexedResults: {
    [file: string]: ESLint.LintResult;
  },
  ruleMetaDatas: {
    [name: string]: Rule.RuleMetaData;
  },
  beforeSha: string,
  afterSha: string,
  created: boolean,
  deleted: boolean,
  failCheck: boolean,
) {
  startGroup('GitHub Push');
  if (created || deleted || beforeSha === ZERO_SHA || afterSha === ZERO_SHA) {
    info(`Skipped comparing files in the push`);
    info(`  Created: ${created}`);
    info(`  Deleted: ${deleted}`);
    info(`  Before SHA: ${beforeSha}`);
    info(`  After SHA: ${afterSha}`);
    endGroup();
    return;
  }

  const files = await getPushFiles(beforeSha, afterSha);

  if (files.length === 0) {
    info(`Push contains no files`);
    endGroup();
    return;
  }

  let warningCounter = 0;
  let errorCounter = 0;
  for (const file of files) {
    info(`  File name: ${file.filename}`);
    info(`  File status: ${file.status}`);
    if (file.status === 'removed') {
      continue;
    }

    const indexedModifiedLines = getIndexedModifiedLines(file.patch);

    const result = indexedResults[file.filename];
    if (result) {
      for (const message of result.messages) {
        if (message.ruleId === null || result.source === undefined) {
          continue;
        }
        const rule = ruleMetaDatas[message.ruleId];
        if (indexedModifiedLines[message.line]) {
          info(`  Matched line: ${message.line}`);
          switch (message.severity) {
            case 1:
              warning(
                formatAnnotationMessage(
                  message.ruleId,
                  message.message,
                  rule?.docs?.url,
                ),
                {
                  file: file.filename,
                  startLine: message.line,
                },
              );
              warningCounter++;
              break;
            case 2:
              error(
                formatAnnotationMessage(
                  message.ruleId,
                  message.message,
                  rule?.docs?.url,
                ),
                {
                  file: file.filename,
                  startLine: message.line,
                },
              );
              errorCounter++;
              break;
          }
        }
      }
    }
  }
  endGroup();

  startGroup('Feedback');
  if (warningCounter > 0 || errorCounter > 0) {
    if (failCheck) {
      throw new Error('ESLint fails. Please review comments.');
    } else {
      error('ESLint fails');
    }
  } else {
    notice('ESLint passes');
  }
  endGroup();
}
