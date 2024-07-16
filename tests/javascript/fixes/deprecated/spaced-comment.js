/* eslint-disable */
/* eslint-enable spaced-comment */
/* eslint spaced-comment: ["error", "always"] */
function incorrect() {
  //This is a comment with no whitespace at the beginning

  /*This is a comment with no whitespace at the beginning */

  /* This is a comment with whitespace at the beginning but not the end*/
}

function correct() {
  // This is a comment with a whitespace at the beginning

  /* This is a comment with a whitespace at the beginning */

  /*
  * This is a comment with a whitespace at the beginning
  */

  /**
  * I am jsdoc
  */
}
