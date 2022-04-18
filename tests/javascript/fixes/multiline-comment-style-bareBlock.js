/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /* eslint multiline-comment-style: ["error", "bare-block"] */

  // this line
  // calls foo()
  foo();

  /*
  * this line
  * calls foo()
  */
  foo();
}

function correct() {
  /* eslint multiline-comment-style: ["error", "bare-block"] */

  /* this line
    calls foo() */
  foo();
}  
