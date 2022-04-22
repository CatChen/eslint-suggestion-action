/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /*eslint spaced-comment: ["error", "always"]*/

  //This is a comment with no whitespace at the beginning

  /*This is a comment with no whitespace at the beginning */

  /* eslint spaced-comment: ["error", "always", { "block": { "balanced": true } }] */
  /* This is a comment with whitespace at the beginning but not the end*/
}

function correct() {
  /* eslint spaced-comment: ["error", "always"] */

  // This is a comment with a whitespace at the beginning

  /* This is a comment with a whitespace at the beginning */

  /*
  * This is a comment with a whitespace at the beginning
  */

  /* eslint spaced-comment: ["error", "always"] */

  /**
  * I am jsdoc
  */
}
