/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { "initialized": "consecutive" }]*/

  function foo() {
    var a = 1;
    var b = 2;

    foo();

    var c = 3;
    var d = 4;
  }
}

function correct() {
  /*eslint one-var: ["error", { "initialized": "consecutive" }]*/

  function foo() {
    var a = 1,
        b = 2;

    foo();

    var c = 3,
        d = 4;
  }
}
