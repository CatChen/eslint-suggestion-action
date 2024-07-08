"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLint = getESLint;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const core_1 = require("@actions/core");
const changeDirectory_js_1 = require("./changeDirectory.js");
async function getESLint() {
    const absoluteDirectory = (0, node_path_1.resolve)(changeDirectory_js_1.DEFAULT_WORKING_DIRECTORY, (0, core_1.getInput)('directory'));
    const eslintJsPath = (0, node_path_1.resolve)(absoluteDirectory, (0, core_1.getInput)('eslint-lib-path'));
    if (!(0, node_fs_1.existsSync)(eslintJsPath)) {
        throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
    }
    (0, core_1.notice)(`Using ESLint from: ${eslintJsPath}`);
    const { ESLint, loadESLint } = (await Promise.resolve(`${(0, node_path_1.resolve)(absoluteDirectory, eslintJsPath)}`).then(s => __importStar(require(s))));
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
