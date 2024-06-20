"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_WORKING_DIRECTORY = void 0;
exports.changeDirectory = changeDirectory;
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const core_1 = require("@actions/core");
exports.DEFAULT_WORKING_DIRECTORY = node_process_1.default.cwd();
function changeDirectory() {
    (0, core_1.info)(`Working directory is: ${exports.DEFAULT_WORKING_DIRECTORY}`);
    const absoluteDirectory = node_path_1.default.resolve(exports.DEFAULT_WORKING_DIRECTORY, (0, core_1.getInput)('directory'));
    (0, core_1.info)(`Working directory is changed to: ${absoluteDirectory}`);
    node_process_1.default.chdir(absoluteDirectory);
}
