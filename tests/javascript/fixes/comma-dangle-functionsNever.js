/* eslint-disable */
/* eslint-enable comma-dangle */
/*eslint comma-dangle: ["error", {"functions": "never"}]*/
function incorrect() {
  function foo(a, b,) {
  }

  foo(a, b,);
  new foo(a, b,);
}

function correct() {
  function foo(a, b) {
  }

  foo(a, b);
  new foo(a, b);
}
