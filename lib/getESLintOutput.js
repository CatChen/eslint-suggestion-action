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
exports.getESLintOutput = void 0;
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const glob_1 = require("glob");
function getESLintOutput(eslintBinPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const targets = (0, core_1.getInput)('targets');
        const eslintOutput = yield (0, exec_1.getExecOutput)(eslintBinPath, [
            ...(0, glob_1.sync)(targets),
            '--no-error-on-unmatched-pattern',
            '--format',
            'json',
        ]);
        // eslintOutput.exitCode !== ExitCode.Success when there is any ESLint warning or error.
        // Swallow this kind of error and parse the JSON that represents the warnings and errors.
        const results = JSON.parse(eslintOutput.stdout);
        return results;
    });
}
exports.getESLintOutput = getESLintOutput;
