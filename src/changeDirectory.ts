import path from 'node:path';
import { chdir, cwd } from 'node:process';
import { info } from '@actions/core';

const DEFAULT_WORKING_DIRECTORY = cwd();

export function changeDirectory(directory: string) {
  info(`Working directory is: ${DEFAULT_WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(DEFAULT_WORKING_DIRECTORY, directory);
  if (absoluteDirectory !== DEFAULT_WORKING_DIRECTORY) {
    info(`Working directory is changed to: ${absoluteDirectory}`);
    chdir(absoluteDirectory);
  }
}
