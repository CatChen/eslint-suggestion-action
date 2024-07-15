/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { "initialized": "consecutive" }]*/
function incorrect() {
  function foo() {
    var a = 1;
    var b = 2;

    foo();

    var c = 3;
    var d = 4;
  }
}

function correct() {
  function foo() {
    var a = 1,
        b = 2;

    foo();

    var c = 3,
        d = 4;
  }
}
