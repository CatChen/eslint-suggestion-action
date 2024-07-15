/* eslint-disable */
/* eslint-enable no-div-regex */
/*eslint no-div-regex: "error"*/
function incorrect() {
  function bar() { return /=foo/; }
}

function correct() {
  function bar() { return /[=]foo/; }
}