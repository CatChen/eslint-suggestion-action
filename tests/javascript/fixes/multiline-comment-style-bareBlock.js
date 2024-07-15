/* eslint-disable */
/* eslint-enable multiline-comment-style */
/* eslint multiline-comment-style: ["error", "bare-block"] */
function incorrect() {
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
  /* this line
    calls foo() */
  foo();
}  
