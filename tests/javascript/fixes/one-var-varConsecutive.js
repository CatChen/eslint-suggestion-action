/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "consecutive" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var a;
    var b;
  }
}

function correct() {
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
