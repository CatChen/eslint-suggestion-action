"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLint = getESLint;
const module_1 = require("module");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const core_1 = require("@actions/core");
const changeDirectory_1 = require("./changeDirectory");
async function getESLint() {
    const absoluteDirectory = (0, node_path_1.resolve)(changeDirectory_1.DEFAULT_WORKING_DIRECTORY, (0, core_1.getInput)('directory'));
    const require = (0, module_1.createRequire)(absoluteDirectory);
    const eslintJsPath = (0, node_path_1.resolve)(absoluteDirectory, (0, core_1.getInput)('eslint-lib-path'));
    if (!(0, node_fs_1.existsSync)(eslintJsPath)) {
        throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
    }
    (0, core_1.notice)(`Using ESLint from: ${eslintJsPath}`);
    const { ESLint, loadESLint } = require(eslintJsPath);
    (0, core_1.notice)(`ESLint version: ${ESLint.version}`);
    const configPath = (0, core_1.getInput)('config-path');
    if (configPath) {
        const absoluteConfigPath = (0, node_path_1.resolve)(absoluteDirectory, configPath);
        (0, core_1.notice)(`Using ESLint config from: ${absoluteConfigPath}`);
        const eslint = new ESLint({ overrideConfigFile: absoluteConfigPath });
        return eslint;
    }
    if (loadESLint) {
        // ESLint 8.57.0 and later
        (0, core_1.notice)('Using ESLint with default configuration');
        const eslint = new (await loadESLint())();
        return eslint;
    }
    const eslintConfig = (await new ESLint().calculateConfigForFile('package.json'));
    if (!eslintConfig) {
        throw new Error('Failed to find ESLint configuration. Please set the config-path input.');
    }
    const eslint = new ESLint({ baseConfig: eslintConfig });
    return eslint;
}
