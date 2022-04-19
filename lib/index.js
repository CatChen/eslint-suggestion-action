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
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const node_process_1 = __importDefault(require("node:process"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const module_1 = require("module");
const HUNK_HEADER_PATTERN = /^@@ \-\d+(,\d+)? \+(\d+)(,(\d+))? @@/;
const RULE_UNSCOPE_PATTERN = /^(@.*?\/)?(.*)$/;
const WORKING_DIRECTORY = node_process_1.default.cwd();
function run(mock = undefined) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        const outOfScopeAnnotations = mock === undefined ? (0, core_1.getInput)("out-of-scope-annotations") : false;
        const suppressFixes = mock === undefined ? (0, core_1.getInput)("suppress-fixes") : false;
        const suppressSuggestions = mock === undefined ? (0, core_1.getInput)("suppress-suggestions") : false;
        const suppressAnnotations = mock === undefined ? (0, core_1.getInput)("suppress-annotations") : false;
        (0, core_1.startGroup)("ESLint");
        const githubWorkspace = mock === undefined ? (0, core_1.getInput)("github-workspace") : node_path_1.default.resolve(".");
        const require = (0, module_1.createRequire)(githubWorkspace);
        const eslintJsPath = node_path_1.default.resolve(githubWorkspace, "./node_modules/eslint/lib/api.js");
        if (!(0, node_fs_1.existsSync)(eslintJsPath)) {
            throw new Error(`ESLint JavaScript cannot be found at ${eslintJsPath}`);
        }
        (0, core_1.info)(`Using ESLint from: ${eslintJsPath}`);
        const { ESLint } = require(eslintJsPath);
        const eslintConfig = yield new ESLint().calculateConfigForFile("package.json");
        const eslint = new ESLint({ baseConfig: eslintConfig });
        const eslintBinPath = node_path_1.default.resolve(WORKING_DIRECTORY, mock === undefined ? (0, core_1.getInput)("eslint-path") : "node_modules/.bin/eslint");
        if (!(0, node_fs_1.existsSync)(eslintBinPath)) {
            throw new Error(`ESLint binary cannot be found at ${eslintBinPath}`);
        }
        let stdout = "";
        let stderr = "";
        (0, core_1.info)(`Using ESLint binary from: ${eslintBinPath}`);
        try {
            yield (0, exec_1.exec)(eslintBinPath, [".", "--format", "json"], {
                listeners: {
                    stdout: (data) => {
                        stdout += data.toString();
                    },
                    stderr: (data) => {
                        stderr += data.toString();
                    },
                },
            });
        }
        catch (error) { }
        const results = JSON.parse(stdout);
        const IndexedResults = {};
        for (const file of results) {
            const relativePath = node_path_1.default.relative(WORKING_DIRECTORY, file.filePath);
            (0, core_1.info)(`File name: ${relativePath}`);
            IndexedResults[relativePath] = file;
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
        const eslintRules = eslint.getRulesMetaForResults(results);
        (0, core_1.endGroup)();
        (0, core_1.startGroup)("GitHub Pull Request");
        const githubToken = (mock === null || mock === void 0 ? void 0 : mock.token) || (0, core_1.getInput)("github-token");
        const octokit = (0, github_1.getOctokit)(githubToken);
        let pullRequest;
        if (mock) {
            const response = yield octokit.rest.pulls.get({
                owner: mock.owner,
                repo: mock.repo,
                pull_number: mock.number,
            });
            pullRequest = response.data;
        }
        else {
            pullRequest = github_1.context.payload.pull_request;
        }
        const owner = (mock === null || mock === void 0 ? void 0 : mock.owner) || github_1.context.repo.owner;
        const repo = (mock === null || mock === void 0 ? void 0 : mock.repo) || github_1.context.repo.repo;
        const baseSha = pullRequest.base.sha;
        const headSha = pullRequest.head.sha;
        (0, core_1.info)(`Owner: ${owner}`);
        (0, core_1.info)(`Repo: ${repo}`);
        (0, core_1.info)(`Pull request number: ${(mock === null || mock === void 0 ? void 0 : mock.number) || pullRequest.number}`);
        (0, core_1.info)(`Base SHA: ${baseSha}`);
        (0, core_1.info)(`Head SHA: ${headSha}`);
        const response = yield octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: pullRequest.number,
        });
        (0, core_1.info)(`Files (${response.data.length}):`);
        for (const file of response.data) {
            (0, core_1.info)(`  File name: ${file.filename}`);
            (0, core_1.info)(`  File status: ${file.status}`);
            if (file.status === "removed") {
                continue;
            }
            const modifiedLines = [];
            const indexedModifiedLines = {};
            let currentLine = 0;
            let remainingLinesInHunk = 0;
            const lines = (_a = file.patch) === null || _a === void 0 ? void 0 : _a.split("\n");
            if (lines) {
                for (const line of lines) {
                    if (remainingLinesInHunk === 0) {
                        const matches = line.match(HUNK_HEADER_PATTERN);
                        currentLine = parseInt((matches === null || matches === void 0 ? void 0 : matches[2]) || "1");
                        remainingLinesInHunk = parseInt((matches === null || matches === void 0 ? void 0 : matches[4]) || "1");
                        if (!currentLine || !remainingLinesInHunk) {
                            throw new Error(`Expecting hunk header in ${file.filename} but seeing ${line}.`);
                        }
                    }
                    else if (line[0] === "-") {
                        continue;
                    }
                    else {
                        if (line[0] === "+") {
                            modifiedLines.push(currentLine);
                            indexedModifiedLines[currentLine] = true;
                        }
                        currentLine++;
                        remainingLinesInHunk--;
                    }
                }
            }
            (0, core_1.info)(`  File modified lines: ${modifiedLines.join()}`);
            if (file.patch !== undefined) {
                (0, core_1.info)(`  File patch: \n${file.patch
                    .split("\n")
                    .map((line) => "    " + line)
                    .join("\n")}\n`);
            }
            const result = IndexedResults[file.filename];
            if (result) {
                const source = result.source.split("\n");
                const sourceLineLengths = source.map((line) => line.length + 1);
                for (const message of result.messages) {
                    const unscopedRuleId = (_b = message.ruleId.match(RULE_UNSCOPE_PATTERN)) === null || _b === void 0 ? void 0 : _b[2];
                    const rule = eslintRules[message.ruleId];
                    if (!suppressAnnotations &&
                        (indexedModifiedLines[message.line] || outOfScopeAnnotations))
                        switch (message.severity) {
                            case 0:
                                (0, core_1.notice)(`${(_c = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _c === void 0 ? void 0 : _c.description}\n${(_d = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _d === void 0 ? void 0 : _d.url}`, {
                                    file: file.filename,
                                    startLine: message.line,
                                    startColumn: message.column,
                                    endColumn: message.endColumn,
                                    title: `${message.message} (${message.ruleId})`,
                                });
                                break;
                            case 1:
                                (0, core_1.warning)(`${(_e = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _e === void 0 ? void 0 : _e.description}\n${(_f = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _f === void 0 ? void 0 : _f.url}`, {
                                    file: file.filename,
                                    startLine: message.line,
                                    startColumn: message.column,
                                    endColumn: message.endColumn,
                                    title: `${message.message} (${message.ruleId})`,
                                });
                                break;
                            case 2:
                                (0, core_1.error)(`${(_g = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _g === void 0 ? void 0 : _g.description}\n${(_h = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _h === void 0 ? void 0 : _h.url}`, {
                                    file: file.filename,
                                    startLine: message.line,
                                    startColumn: message.column,
                                    endColumn: message.endColumn,
                                    title: `${message.message} (${message.ruleId})`,
                                });
                                break;
                            default:
                                throw new Error(`Unrecognized severity: ${message.severity}`);
                        }
                    if (indexedModifiedLines[message.line]) {
                        (0, core_1.info)(`  Matched line: ${message.line}`);
                        if (message.fix && !suppressFixes) {
                            const beforeSourceLength = sourceLineLengths
                                .slice(0, message.line - 1)
                                .reduce((previous, current) => previous + current, 0);
                            const replaceIndexStart = message.fix.range[0] - beforeSourceLength;
                            const replaceIndexEnd = message.fix.range[1] - beforeSourceLength;
                            const originalLine = source[message.line - 1];
                            const replacedLine = originalLine.substring(0, replaceIndexStart) +
                                message.fix.text +
                                originalLine.substring(replaceIndexEnd);
                            (0, core_1.info)("    Fix:\n" +
                                "      " +
                                `${originalLine} => ${replacedLine} @ ${message.line}`.trim());
                            const response = yield octokit.rest.pulls.createReviewComment({
                                owner,
                                repo,
                                body: `[${(_j = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _j === void 0 ? void 0 : _j.description}](${(_k = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _k === void 0 ? void 0 : _k.url}). Fix available:\n\n` +
                                    "```suggestion\n" +
                                    `${replacedLine}\n` +
                                    "```\n",
                                pull_number: pullRequest.number,
                                commit_id: headSha,
                                path: file.filename,
                                side: "RIGHT",
                                line: message.line,
                            });
                            (0, core_1.info)(`      Commented`);
                        }
                        if (message.suggestions && !suppressSuggestions) {
                            const beforeSourceLength = sourceLineLengths
                                .slice(0, message.line - 1)
                                .reduce((previous, current) => previous + current, 0);
                            const suggestionBlocks = [];
                            for (const suggestion of message.suggestions) {
                                const replaceIndexStart = suggestion.fix.range[0] - beforeSourceLength;
                                const replaceIndexEnd = suggestion.fix.range[1] - beforeSourceLength;
                                const originalLine = source[message.line - 1];
                                const replacedLine = originalLine.substring(0, replaceIndexStart) +
                                    suggestion.fix.text +
                                    originalLine.substring(replaceIndexEnd);
                                suggestionBlocks.push(`${suggestion.desc} (${suggestion.messageId})\n\n` +
                                    "```suggestion\n" +
                                    `${replacedLine}\n` +
                                    "```\n");
                                (0, core_1.info)("    Suggestion:\n" +
                                    "      " +
                                    `${originalLine} => ${replacedLine} @ ${message.line}`.trim());
                            }
                            const response = yield octokit.rest.pulls.createReviewComment({
                                owner,
                                repo,
                                body: `[${(_l = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _l === void 0 ? void 0 : _l.description}](${(_m = rule === null || rule === void 0 ? void 0 : rule.docs) === null || _m === void 0 ? void 0 : _m.url}). Suggestion(s) available:\n\n` +
                                    suggestionBlocks.join("\n"),
                                pull_number: pullRequest.number,
                                commit_id: headSha,
                                path: file.filename,
                                side: "RIGHT",
                                line: message.line,
                            });
                            (0, core_1.info)(`    Commented`);
                        }
                    }
                }
            }
        }
        (0, core_1.endGroup)();
    });
}
if (node_process_1.default.argv.length === 6) {
    run({
        token: node_process_1.default.argv[2],
        owner: node_process_1.default.argv[3],
        repo: node_process_1.default.argv[4],
        number: parseInt(node_process_1.default.argv[5]),
    });
}
else {
    run();
}
