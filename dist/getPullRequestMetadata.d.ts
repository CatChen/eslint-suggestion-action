export declare function getPullRequestMetadata(): {
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
};
export declare function getPullRequestMetadataByNumber(pullRequestNumber: number): Promise<{
    owner: string;
    repo: string;
    pullRequestNumber: number;
    baseSha: string;
    headSha: string;
}>;
