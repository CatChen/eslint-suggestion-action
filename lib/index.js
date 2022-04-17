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
const HUNK_HEADER_PATTERN = /^@@ \-\d+,\d+ \+(\d+),(\d+) @@/;
const WORKING_DIRECTORY = node_process_1.default.cwd();
function run(mock = undefined) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.startGroup)("ESLint");
        const eslintPath = mock === undefined ? (0, core_1.getInput)("eslint-path") : "node_modules/.bin/eslint";
        if (!(0, node_fs_1.existsSync)(eslintPath)) {
            throw new Error(`ESLint cannot be found at ${node_fs_1.existsSync}`);
        }
        let stdout = "";
        let stderr = "";
        console.log(node_path_1.default.resolve(WORKING_DIRECTORY, eslintPath));
        try {
            yield (0, exec_1.exec)(node_path_1.default.resolve(WORKING_DIRECTORY, eslintPath), [".", "--format", "json"], {
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
                (0, core_1.info)(`${message.message} @ ${message.line}`);
            }
        }
        (0, core_1.endGroup)();
        (0, core_1.startGroup)("GitHub Comment");
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
        (0, core_1.info)(`Files: ${response.data.length}`);
        for (const file of response.data) {
            (0, core_1.info)(`File name: ${file.filename}`);
            (0, core_1.info)(`File state: ${file.status}`);
            const modifiedLines = [];
            const indexedModifiedLines = {};
            let currentLine = 0;
            let remainingLinesInHunk = 0;
            const lines = (_a = file.patch) === null || _a === void 0 ? void 0 : _a.split("\n");
            if (lines) {
                for (const line of lines) {
                    if (remainingLinesInHunk === 0) {
                        const matches = line.match(HUNK_HEADER_PATTERN);
                        currentLine = parseInt((matches === null || matches === void 0 ? void 0 : matches[1]) || "0");
                        remainingLinesInHunk = parseInt((matches === null || matches === void 0 ? void 0 : matches[2]) || "0");
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
            (0, core_1.info)(`File modified lines: ${modifiedLines.join()}`);
            (0, core_1.info)(`File patch: \n${file.patch}\n`);
            const result = IndexedResults[file.filename];
            if (result) {
                const source = result.source.split("\n");
                const sourceLineLengths = source.map((line) => line.length);
                for (const message of result.messages) {
                    console.log(message.line, indexedModifiedLines[message.line]);
                    if (indexedModifiedLines[message.line]) {
                        (0, core_1.info)(`Line matched: ${message.line}`);
                        if (message.fix) {
                            const beforeSourceLength = sourceLineLengths
                                .slice(0, message.line - 1)
                                .reduce((previous, current) => previous + current, 0);
                            const replaceIndexStart = message.fix.range[0] - beforeSourceLength;
                            const replaceIndexEnd = message.fix.range[1] - beforeSourceLength;
                            const originalLine = source[message.line - 1];
                            const replacedLine = originalLine.substring(0, replaceIndexStart) +
                                message.fix.text +
                                originalLine.substring(replaceIndexEnd);
                            (0, core_1.info)(`Suggestion:\n${originalLine} => ${replacedLine}`);
                            const response = yield octokit.rest.pulls.createReviewComment({
                                owner,
                                repo,
                                body: `${message.message} (${message.ruleId})\n\n` +
                                    "```suggestion\n" +
                                    `${replacedLine}\n` +
                                    "```\n",
                                pull_number: pullRequest.number,
                                commit_id: headSha,
                                path: file.filename,
                                side: "RIGHT",
                                line: message.line,
                            });
                            (0, core_1.info)(`Commented in ${file.filename}:${message.line} with ${message.ruleId} plus fix`);
                        }
                        else {
                            const response = yield octokit.rest.pulls.createReviewComment({
                                owner,
                                repo,
                                body: `${message.message} (${message.ruleId})`,
                                pull_number: pullRequest.number,
                                commit_id: headSha,
                                side: "RIGHT",
                                line: message.line,
                            });
                            (0, core_1.info)(`Commented in ${file.filename}:${message.line} with ${message.ruleId}`);
                        }
                    }
                }
            }
        }
        (0, core_1.endGroup)();
    });
}
console.log(node_process_1.default.argv);
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
