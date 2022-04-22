/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
  /*eslint-env es6*/

  function foo() {
    let a,
        b;
    let c;

    var d,
        e;
  }

  function foo() {
    const a = 1,
        b = 2;
    const c = 3;

    var d,
        e;
  }
}

function correct() {
  /*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
  /*eslint-env es6*/

  function foo() {
    let a,
        b;

    var d;
    var e;

    let f;
  }

  function foo() {
    const a = 1,
          b = 2;

    var c;
    var d;

    const e = 3;
  }
}
