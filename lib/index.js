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
exports.run = exports.changeDirectory = void 0;
const node_process_1 = __importDefault(require("node:process"));
const node_path_1 = __importDefault(require("node:path"));
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const getESLint_1 = require("./getESLint");
const getESLintOutput_1 = require("./getESLintOutput");
const pullRequestEventHandler_1 = require("./pullRequestEventHandler");
const pushEventHandler_1 = require("./pushEventHandler");
const defaultEventHandler_1 = require("./defaultEventHandler");
const WORKING_DIRECTORY = node_process_1.default.cwd();
function changeDirectory() {
    (0, core_1.info)(`Working directory is: ${WORKING_DIRECTORY}`);
    const absoluteDirectory = node_path_1.default.resolve(WORKING_DIRECTORY, (0, core_1.getInput)("directory"));
    (0, core_1.info)(`Working directory is changed to: ${absoluteDirectory}`);
    node_process_1.default.chdir(absoluteDirectory);
}
exports.changeDirectory = changeDirectory;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.startGroup)("ESLint");
        changeDirectory();
        const { eslint, eslintBinPath } = yield (0, getESLint_1.getESLint)();
        const results = yield (0, getESLintOutput_1.getESLintOutput)(eslintBinPath);
        const indexedResults = {};
        for (const file of results) {
            const relativePath = node_path_1.default.relative(WORKING_DIRECTORY, file.filePath);
            (0, core_1.info)(`File name: ${relativePath}`);
            indexedResults[relativePath] = file;
            for (const message of file.messages) {
                (0, core_1.info)(`  [${message.severity}] ${message.message} @ ${message.line}`);
                if (message.suggestions) {
                    (0, core_1.info)(`  Suggestions (${message.suggestions.length}):`);
                    for (const suggestion of message.suggestions) {
                        (0, core_1.info)(`    ${suggestion.desc} (${suggestion.messageId})`);
                    }
                }
            }
        }
        const ruleMetaDatas = eslint.getRulesMetaForResults(results);
        (0, core_1.endGroup)();
        (0, core_1.info)(`Event name: ${github_1.context.eventName}`);
        switch (github_1.context.eventName) {
            case "pull_request":
                (0, pullRequestEventHandler_1.pullRequestEventHandler)(indexedResults, ruleMetaDatas);
                break;
            case "push":
                (0, pushEventHandler_1.pushEventHandler)(indexedResults, ruleMetaDatas);
                break;
            case "workflow_run":
                (() => {
                    const workflowRun = github_1.context.payload;
                    switch (workflowRun.workflow_run.event) {
                        case "pull_request":
                            workflowRun.workflow_run.pull_requests;
                            (0, core_1.error)(`Unimplemented GitHub Action event: ${github_1.context.eventName}`);
                            return;
                        case "push":
                            (0, core_1.error)(`Unimplemented GitHub Action event: ${github_1.context.eventName}`);
                            return;
                        default:
                            (() => {
                                const workflowSourceEventName = workflowRun.workflow_run.event
                                    .split("_")
                                    .map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); })
                                    .join(" ");
                                (0, defaultEventHandler_1.defaultEventHandler)(`Workflow (${workflowSourceEventName})`, results, ruleMetaDatas);
                            })();
                            break;
                    }
                })();
                break;
            default:
                (0, defaultEventHandler_1.defaultEventHandler)(github_1.context.eventName
                    .split("_")
                    .map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); })
                    .join(" "), results, ruleMetaDatas);
                break;
        }
    });
}
exports.run = run;
run();
