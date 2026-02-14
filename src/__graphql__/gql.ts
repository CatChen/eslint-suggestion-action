/* eslint-disable */
import * as types from './graphql.js';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query GetReviewThreads(\n    $owner: String!\n    $repo: String!\n    $pullRequestNumber: Int!\n  ) {\n    repository(owner: $owner, name: $repo) {\n      pullRequest(number: $pullRequestNumber) {\n        reviewThreads(last: 100) {\n          totalCount\n          nodes {\n            id\n            isResolved\n            comments(last: 100) {\n              totalCount\n              nodes {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': typeof types.GetReviewThreadsDocument;
  '\n  mutation ResolveReviewThread($nodeId: ID!) {\n    resolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n': typeof types.ResolveReviewThreadDocument;
  '\n  mutation UnresolveReviewThread($nodeId: ID!) {\n    unresolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n': typeof types.UnresolveReviewThreadDocument;
};
const documents: Documents = {
  '\n  query GetReviewThreads(\n    $owner: String!\n    $repo: String!\n    $pullRequestNumber: Int!\n  ) {\n    repository(owner: $owner, name: $repo) {\n      pullRequest(number: $pullRequestNumber) {\n        reviewThreads(last: 100) {\n          totalCount\n          nodes {\n            id\n            isResolved\n            comments(last: 100) {\n              totalCount\n              nodes {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.GetReviewThreadsDocument,
  '\n  mutation ResolveReviewThread($nodeId: ID!) {\n    resolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n':
    types.ResolveReviewThreadDocument,
  '\n  mutation UnresolveReviewThread($nodeId: ID!) {\n    unresolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n':
    types.UnresolveReviewThreadDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetReviewThreads(\n    $owner: String!\n    $repo: String!\n    $pullRequestNumber: Int!\n  ) {\n    repository(owner: $owner, name: $repo) {\n      pullRequest(number: $pullRequestNumber) {\n        reviewThreads(last: 100) {\n          totalCount\n          nodes {\n            id\n            isResolved\n            comments(last: 100) {\n              totalCount\n              nodes {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n',
): typeof import('./graphql.js').GetReviewThreadsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResolveReviewThread($nodeId: ID!) {\n    resolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql.js').ResolveReviewThreadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UnresolveReviewThread($nodeId: ID!) {\n    unresolveReviewThread(input: { threadId: $nodeId }) {\n      thread {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql.js').UnresolveReviewThreadDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
