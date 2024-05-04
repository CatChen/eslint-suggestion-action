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
exports.getESLintResults = void 0;
const core_1 = require("@actions/core");
const glob_1 = require("glob");
function getESLintResults(eslint) {
    return __awaiter(this, void 0, void 0, function* () {
        const targets = (0, core_1.getInput)('targets');
        return eslint.lintFiles(targets ? (0, glob_1.sync)(targets) : []);
    });
}
exports.getESLintResults = getESLintResults;
