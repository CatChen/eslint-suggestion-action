/* eslint-disable */
/* eslint-enable multiline-comment-style */
/* eslint multiline-comment-style: ["error", "separate-lines"] */
function incorrect() {
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
  // This line
  // calls foo()
  foo();
}  
