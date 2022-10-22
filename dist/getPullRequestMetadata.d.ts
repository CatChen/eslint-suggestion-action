export declare function getPullRequestMetadata(): Promise<{
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
}>;
