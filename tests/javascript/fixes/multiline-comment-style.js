/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /* eslint multiline-comment-style: ["error", "starred-block"] */

  // this line
  // calls foo()
  foo();

  /* this line
  calls foo() */
  foo();

  /* this comment
  * is missing a newline after /*
  */

  /*
  * this comment
  * is missing a newline at the end */

  /*
  * the star in this line should have a space before it
  */

  /*
  * the star on the following line should have a space before it
  */
}

function correct() {
  /* eslint multiline-comment-style: ["error", "starred-block"] */

  /*
  * this line
  * calls foo()
  */
  foo();

  // single-line comment
}

function bareBlock() {
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
}

function separateLines() {
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
}