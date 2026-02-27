export declare function eslintFeedback({ requestChanges, failCheck, githubToken, directory, targets, eslintLibPath, configPath, }: {
    requestChanges: boolean;
    failCheck: boolean;
    githubToken: string;
    directory: string;
    targets: string;
    eslintLibPath: string;
    configPath: string;
}): Promise<void>;
