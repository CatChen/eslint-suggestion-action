/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { var: "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var bar,
        baz;
  }
}

function correct() {
  /*eslint one-var: ["error", { var: "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var bar,
        baz;
    const bar = 1; // `const` and `let` declarations are ignored if they are not specified
    const baz = 2;
    let qux;
    let norf;
  }
}
