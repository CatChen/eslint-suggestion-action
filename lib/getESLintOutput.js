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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getESLintOutput = void 0;
const node_child_process_1 = __importDefault(require("node:child_process"));
const core_1 = require("@actions/core");
function getESLintOutput(eslintBinPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const targets = (0, core_1.getInput)("targets");
        let results = [];
        try {
            const stdout = node_child_process_1.default.execSync(`${eslintBinPath} "${targets}" --no-error-on-unmatched-pattern --format json`);
            results = JSON.parse(stdout.toString());
        }
        catch (error) {
            // Ignore the error.
        }
        return results;
    });
}
exports.getESLintOutput = getESLintOutput;
