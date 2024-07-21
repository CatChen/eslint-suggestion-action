/* eslint-disable */
/* eslint-enable capitalized-comments */
/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */
foo();
// This comment is valid since it has the correct capitalization.
// this comment is ignored since it follows another comment,
// and this one as well because it follows yet another comment.

bar();
/* Here is a block comment which has the correct capitalization, */
/* but this one is ignored due to being consecutive; */
/*
 * in fact, even if any of these are multi-line, that is fine too.
 */