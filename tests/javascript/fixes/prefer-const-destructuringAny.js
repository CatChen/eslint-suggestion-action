/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-const-assign, no-constant-condition */
function incorrect() {
  /*eslint prefer-const: "error"*/
  /*eslint-env es6*/

  let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
  a = a + 1;
}

function correct() {
  /*eslint prefer-const: "error"*/
  /*eslint-env es6*/

  // using const.
  const {a: a0, b} = obj;
  const a = a0 + 1;

  // all variables are reassigned.
  let {a, b} = obj;
  a = a + 1;
  b = b + 1;
}
