export declare function eslintFeedback({ requestChanges, failCheck, githubToken, directory, targets, eslintLibPath, eslintBinPath, configPath, }: {
    requestChanges: boolean;
    failCheck: boolean;
    githubToken: string;
    directory: string;
    targets: string;
    eslintLibPath: string;
    eslintBinPath: string;
    configPath: string;
}): Promise<void>;
