/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { var: "consecutive" }]*/
  /*eslint-env es6*/

  function foo() {
    var a;
    var b;
  }
}

function correct() {
  /*eslint one-var: ["error", { var: "consecutive" }]*/
  /*eslint-env es6*/

  function foo() {
    var a,
        b;
    const c = 1; // `const` and `let` declarations are ignored if they are not specified
    const d = 2;
    let e;
    let f;
  }
}
