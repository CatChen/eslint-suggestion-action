import path from 'node:path';
import { chdir, cwd } from 'node:process';
import { getInput, info } from '@actions/core';

const DEFAULT_WORKING_DIRECTORY = cwd();

export function changeDirectory() {
  info(`Working directory is: ${DEFAULT_WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(
    DEFAULT_WORKING_DIRECTORY,
    getInput('directory'),
  );
  if (absoluteDirectory !== DEFAULT_WORKING_DIRECTORY) {
    info(`Working directory is changed to: ${absoluteDirectory}`);
    chdir(absoluteDirectory);
  }
}
