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
exports.defaultEventHandler = void 0;
const node_path_1 = __importDefault(require("node:path"));
const core_1 = require("@actions/core");
const changeDirectory_1 = require("./changeDirectory");
function defaultEventHandler(eventName, results, ruleMetaDatas) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const failCheck = (0, core_1.getBooleanInput)("fail-check");
        (0, core_1.startGroup)(`GitHub ${eventName}`);
        let warningCounter = 0;
        let errorCounter = 0;
        for (const result of results) {
            const relativePath = node_path_1.default.relative(changeDirectory_1.DEFAULT_WORKING_DIRECTORY, result.filePath);
            for (const message of result.messages) {
                if (message.ruleId === null || result.source === undefined) {
                    continue;
                }
                const rule = ruleMetaDatas[message.ruleId];
                (0, core_1.info)(`  ${relativePath}:${message.line}`);
                switch (message.severity) {
                    case 0:
                        (0, core_1.notice)(`[${message.ruleId}]${message.message}: (${(_a = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _a === void 0 ? void 0 : _a.url})`, {
                            file: relativePath,
                            startLine: message.line,
                        });
                        break;
                    case 1:
                        (0, core_1.warning)(`[${message.ruleId}]${message.message}: (${(_b = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _b === void 0 ? void 0 : _b.url})`, {
                            file: relativePath,
                            startLine: message.line,
                        });
                        warningCounter++;
                        break;
                    case 2:
                        (0, core_1.error)(`[${message.ruleId}]${message.message}: (${(_c = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _c === void 0 ? void 0 : _c.url})`, {
                            file: relativePath,
                            startLine: message.line,
                        });
                        errorCounter++;
                        break;
                }
            }
        }
        (0, core_1.endGroup)();
        (0, core_1.startGroup)("Feedback");
        if (warningCounter > 0 || errorCounter > 0) {
            if (failCheck) {
                throw new Error("ESLint fails.");
            }
            else {
                (0, core_1.error)("ESLint fails");
            }
        }
        else {
            (0, core_1.info)("ESLint passes");
        }
        (0, core_1.endGroup)();
    });
}
exports.defaultEventHandler = defaultEventHandler;
