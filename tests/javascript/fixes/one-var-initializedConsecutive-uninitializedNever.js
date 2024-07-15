/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/
function incorrect() {
  function foo() {
    var a = 1;
    var b = 2;
    var c,
        d;
    var e = 3;
    var f
  }
}

function correct() {
  function foo() {
    var a = 1,
        b = 2;
    var c;
    var d;
    var e = 3,
        f = 4;
  }
}
