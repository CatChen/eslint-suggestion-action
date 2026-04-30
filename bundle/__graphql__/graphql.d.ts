import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type ReviewThreadsQueryVariables = Exact<{
    owner: string;
    repo: string;
    pullRequestNumber: number;
}>;
export type ReviewThreadsQuery = {
    __typename: 'Query';
    repository: {
        __typename: 'Repository';
        id: string;
        pullRequest: {
            __typename: 'PullRequest';
            id: string;
            reviewThreads: {
                __typename: 'PullRequestReviewThreadConnection';
                totalCount: number;
                nodes: Array<{
                    __typename: 'PullRequestReviewThread';
                    id: string;
                    isResolved: boolean;
                    comments: {
                        __typename: 'PullRequestReviewCommentConnection';
                        totalCount: number;
                        nodes: Array<{
                            __typename: 'PullRequestReviewComment';
                            id: string;
                        } | null> | null;
                    };
                } | null> | null;
            };
        } | null;
    } | null;
};
export type ResolveReviewThreadMutationVariables = Exact<{
    nodeId: string | number;
}>;
export type ResolveReviewThreadMutation = {
    __typename: 'Mutation';
    resolveReviewThread: {
        __typename: 'ResolveReviewThreadPayload';
        thread: {
            __typename: 'PullRequestReviewThread';
            id: string;
        } | null;
    } | null;
};
export type UnresolveReviewThreadMutationVariables = Exact<{
    nodeId: string | number;
}>;
export type UnresolveReviewThreadMutation = {
    __typename: 'Mutation';
    unresolveReviewThread: {
        __typename: 'UnresolveReviewThreadPayload';
        thread: {
            __typename: 'PullRequestReviewThread';
            id: string;
        } | null;
    } | null;
};
export declare class TypedDocumentString<TResult, TVariables> extends String implements DocumentTypeDecoration<TResult, TVariables> {
    __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
    private value;
    __meta__?: Record<string, any> | undefined;
    constructor(value: string, __meta__?: Record<string, any> | undefined);
    toString(): string & DocumentTypeDecoration<TResult, TVariables>;
}
export declare const ReviewThreadsDocument: TypedDocumentString<ReviewThreadsQuery, ReviewThreadsQueryVariables>;
export declare const ResolveReviewThreadDocument: TypedDocumentString<ResolveReviewThreadMutation, ResolveReviewThreadMutationVariables>;
export declare const UnresolveReviewThreadDocument: TypedDocumentString<UnresolveReviewThreadMutation, UnresolveReviewThreadMutationVariables>;
export {};
