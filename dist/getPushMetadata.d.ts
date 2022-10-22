export declare function getPushMetadata(): Promise<{
    owner: string;
    repo: string;
    beforeSha: string;
    afterSha: string;
}>;
