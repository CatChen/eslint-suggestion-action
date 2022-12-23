import path from 'node:path';
import process from 'node:process';
import { getInput, info } from '@actions/core';

export const DEFAULT_WORKING_DIRECTORY = process.cwd();

export function changeDirectory() {
  info(`Working directory is: ${DEFAULT_WORKING_DIRECTORY}`);
  const absoluteDirectory = path.resolve(
    DEFAULT_WORKING_DIRECTORY,
    getInput('directory'),
  );
  info(`Working directory is changed to: ${absoluteDirectory}`);
  process.chdir(absoluteDirectory);
}
