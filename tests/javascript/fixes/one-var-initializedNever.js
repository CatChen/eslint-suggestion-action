/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { "initialized": "never" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var foo = true,
        bar = false;
  }
}

function correct() {
  function foo() {
    var foo = true;
    var bar = false;
    var a, b, c; // Uninitialized variables are ignored
  }
}
