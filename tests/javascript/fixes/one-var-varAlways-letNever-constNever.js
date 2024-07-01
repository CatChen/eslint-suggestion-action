/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
function incorrect() {
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
