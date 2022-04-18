/*eslint-disable @typescript-eslint/no-unused-vars*/
function incorrect() {
  /*eslint spaced-comment: ["error", "never"]*/

  // This is a comment with a whitespace at the beginning

  /* This is a comment with a whitespace at the beginning */

  /* \nThis is a comment with a whitespace at the beginning */
}

function correct() {
  /*eslint spaced-comment: ["error", "never"]*/

  /*This is a comment with no whitespace at the beginning */

  /*eslint spaced-comment: ["error", "never"]*/

  /**
  * I am jsdoc
  */
}
