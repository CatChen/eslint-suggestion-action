/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint comma-dangle: ["error", {"functions": "never"}]*/

  function foo(a, b,) {
  }

  foo(a, b,);
  new foo(a, b,);
}

function correct() {
  /*eslint comma-dangle: ["error", {"functions": "never"}]*/

  function foo(a, b) {
  }

  foo(a, b);
  new foo(a, b);
}
