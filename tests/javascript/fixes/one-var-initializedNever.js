/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { "initialized": "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var foo = true,
        bar = false;
  }
}

function correct() {
  /*eslint one-var: ["error", { "initialized": "never" }]*/

  function foo() {
    var foo = true;
    var bar = false;
    var a, b, c; // Uninitialized variables are ignored
  }
}
