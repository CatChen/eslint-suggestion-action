/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var a, b, c;
    var foo = true;
    var bar = false;
  }
}

function correct() {
  /*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/

  function foo() {
    var a;
    var b;
    var c;
    var foo = true,
        bar = false;
  }

  for (let z of foo) {
    doSomething(z);
  }

  let z;
  for (z of foo) {
    doSomething(z);
  }
}
