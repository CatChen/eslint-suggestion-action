import { getInput } from '@actions/core';
import { sync } from 'glob';
export async function getESLintResults(eslint) {
    const targets = getInput('targets');
    return eslint.lintFiles(targets ? sync(targets) : []);
}
