"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLint = void 0;
const module_1 = require("module");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const core_1 = require("@actions/core");
const changeDirectory_1 = require("./changeDirectory");
function getESLint() {
    return __awaiter(this, void 0, void 0, function* () {
        const absoluteDirectory = (0, node_path_1.resolve)(changeDirectory_1.DEFAULT_WORKING_DIRECTORY, (0, core_1.getInput)("directory"));
        const require = (0, module_1.createRequire)(absoluteDirectory);
        const eslintJsPath = (0, node_path_1.resolve)(absoluteDirectory, (0, core_1.getInput)("eslint-lib-path"));
        if (!(0, node_fs_1.existsSync)(eslintJsPath)) {
            throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
        }
        (0, core_1.notice)(`Using ESLint from: ${eslintJsPath}`);
        const { ESLint } = require(eslintJsPath);
        const eslintConfig = yield new ESLint().calculateConfigForFile("package.json");
        const eslint = new ESLint({ baseConfig: eslintConfig });
        const eslintBinPath = (0, core_1.getInput)("eslint-bin-path");
        if (!(0, node_fs_1.existsSync)(eslintBinPath)) {
            throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
        }
        (0, core_1.notice)(`Using ESLint binary from: ${eslintBinPath}`);
        return { eslint, eslintBinPath };
    });
}
exports.getESLint = getESLint;
