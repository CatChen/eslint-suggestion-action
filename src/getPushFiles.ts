import type { components } from '@octokit/openapi-types/types.js';
import { info, warning } from '@actions/core';
import { getExecOutput } from '@actions/exec';

export type PushFile = Pick<
  components['schemas']['diff-entry'],
  'filename' | 'status' | 'patch'
>;

function getStatus(
  statusToken: string,
): components['schemas']['diff-entry']['status'] {
  switch (statusToken[0]) {
    case 'A':
      return 'added';
    case 'C':
      return 'copied';
    case 'D':
      return 'removed';
    case 'M':
      return 'modified';
    case 'R':
      return 'renamed';
    case 'T':
      return 'changed';
    default:
      warning(
        `Unknown git diff file status "${statusToken}". Treating as modified.`,
      );
      return 'modified';
  }
}

function parseFileStatus(nameStatusOutput: string): PushFile[] {
  const files: PushFile[] = [];
  const lines = nameStatusOutput.split('\n');

  for (const line of lines) {
    if (!line) {
      continue;
    }

    const fields = line.split('\t');
    const statusToken = fields[0];
    if (!statusToken) {
      throw new Error(`Unable to parse status token from line: ${line}`);
    }

    const status = getStatus(statusToken);
    if (statusToken[0] === 'R' || statusToken[0] === 'C') {
      const previousFilename = fields[1];
      const filename = fields[2];
      if (!previousFilename || !filename) {
        throw new Error(
          `Unable to parse renamed or copied filename from line: ${line}`,
        );
      }
      files.push({ filename, status });
    } else {
      const filename = fields[1];
      if (!filename) {
        throw new Error(`Unable to parse filename from line: ${line}`);
      }
      files.push({ filename, status });
    }
  }

  return files;
}

function extractPatches(diffOutput: string, filenames: string[]) {
  const patchesByFilename: Record<string, string> = {};
  let patchLines: string[] = [];
  let filenameIndex = -1;
  let filename: string | undefined;
  const lines = diffOutput.split('\n');

  for (const line of lines) {
    if (line.startsWith('diff --git ')) {
      if (filename !== undefined && patchLines.length > 0) {
        patchesByFilename[filename] = patchLines.join('\n');
      }

      filenameIndex++;
      filename = filenames[filenameIndex];
      if (filename === undefined) {
        throw new Error(
          `Found more diff sections than expected files. Expected ${filenames.length}.`,
        );
      }
      patchLines = [];
      continue;
    }

    if (line.startsWith('@@ ')) {
      patchLines.push(line);
      continue;
    }

    if (patchLines.length > 0) {
      patchLines.push(line);
    }
  }

  if (filenameIndex + 1 !== filenames.length) {
    throw new Error(
      `Found fewer diff sections than expected files. Expected ${filenames.length}, found ${
        filenameIndex + 1
      }.`,
    );
  }

  if (filename !== undefined && patchLines.length > 0) {
    patchesByFilename[filename] = patchLines.join('\n');
  }

  return patchesByFilename;
}

async function ensureCommitExists(sha: string) {
  try {
    await getExecOutput('git', ['cat-file', '-e', `${sha}^{commit}`]);
    return true;
  } catch {
    return false;
  }
}

export async function getPushFiles(beforeSha: string, afterSha: string) {
  const [beforeExists, afterExists] = await Promise.all([
    ensureCommitExists(beforeSha),
    ensureCommitExists(afterSha),
  ]);

  if (!beforeExists || !afterExists) {
    info(`Fetching commits for push range ${beforeSha}..${afterSha}`);
    await getExecOutput('git', [
      'fetch',
      '--no-tags',
      '--depth=1',
      'origin',
      beforeSha,
      afterSha,
    ]);
  }

  const nameStatusResult = await getExecOutput(
    'git',
    [
      '-c',
      'core.quotepath=false',
      'diff',
      '--name-status',
      '--find-renames',
      `${beforeSha}..${afterSha}`,
    ],
    {
      silent: true,
    },
  );
  const files = parseFileStatus(nameStatusResult.stdout);
  info(`Files: (${files.length})`);

  const patchResult = await getExecOutput(
    'git',
    [
      '-c',
      'core.quotepath=false',
      'diff',
      '--unified=0',
      '--no-color',
      '--no-ext-diff',
      '--find-renames',
      `${beforeSha}..${afterSha}`,
    ],
    {
      silent: true,
    },
  );
  const patches = extractPatches(
    patchResult.stdout,
    files.map((file) => file.filename),
  );
  for (const file of files) {
    file.patch = patches[file.filename];
  }

  return files;
}
