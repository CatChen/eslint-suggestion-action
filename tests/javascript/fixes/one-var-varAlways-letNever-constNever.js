/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var bar;
    var baz;
    let qux,
        norf;
  }

  function foo() {
    const bar = 1,
          baz = 2;
    let qux,
        norf;
  }
}

function correct() {
  /*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
  /*eslint-env es6*/

  function foo() {
    var bar,
        baz;
    let qux;
    let norf;
  }

  function foo() {
    const bar = 1;
    const baz = 2;
    let qux;
    let norf;
  }
}
