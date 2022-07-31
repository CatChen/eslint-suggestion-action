/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

  function foo() {
    var a = 1;
    var b = 2;
    var c,
        d;
    var e = 3;
    var f
}

function correct() {
  /*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

  function foo() {
    var a = 1,
        b = 2;
    var c;
    var d;
    var e = 3,
        f = 4;
  }
}
