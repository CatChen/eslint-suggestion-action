/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /* eslint multiline-comment-style: ["error", "separate-lines"] */

  /* This line
  calls foo() */
  foo();

  /*
  * This line
  * calls foo()
  */
  foo();
}

function correct() {
  /* eslint multiline-comment-style: ["error", "separate-lines"] */

  // This line
  // calls foo()
  foo();
}  
