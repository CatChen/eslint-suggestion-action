/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /*eslint no-div-regex: "error"*/

  function bar() { return /=foo/; }
}

function correct() {
  /*eslint no-div-regex: "error"*/

  function bar() { return /[=]foo/; }
}