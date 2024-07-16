/* eslint-disable */
/*eslint-enable spaced-comment*/
/*eslint spaced-comment: ["error", "never"]*/
function incorrect() {  
  // This is a comment with a whitespace at the beginning

  /* This is a comment with a whitespace at the beginning */

  /* \nThis is a comment with a whitespace at the beginning */
}

function correct() {
  /*This is a comment with no whitespace at the beginning */

  /**
  * I am jsdoc
  */
}
