/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: '\n  query ReviewThreads(\n    $owner: String!\n    $repo: String!\n    $pullRequestNumber: Int!\n  ) {\n    repository(owner: $owner, name: $repo) {\n      id\n      pullRequest(number: $pullRequestNumber) {\n        id\n        reviewThreads(last: 100) {\n          totalCount\n          nodes {\n            id\n            isResolved\n            comments(last: 100) {\n              totalCount\n              nodes {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'): typeof import('./graphql.js').ReviewThreadsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: '\n  mutation ResolveReviewThread($nodeId: ID!) {\n    resolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n'): typeof import('./graphql.js').ResolveReviewThreadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: '\n  mutation UnresolveReviewThread($nodeId: ID!) {\n    unresolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n'): typeof import('./graphql.js').UnresolveReviewThreadDocument;
