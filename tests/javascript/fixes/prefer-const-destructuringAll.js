/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-const-assign, no-constant-condition */
function incorrect() {
  /*eslint prefer-const: ["error", {"destructuring": "all"}]*/
  /*eslint-env es6*/

  // all of `a` and `b` should be const, so those are warned.
  let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                               'b' is never reassigned, use 'const' instead.*/
}

function correct() {
  /*eslint prefer-const: ["error", {"destructuring": "all"}]*/
  /*eslint-env es6*/

  // 'b' is never reassigned, but all of `a` and `b` should not be const, so those are ignored.
  let {a, b} = obj;
  a = a + 1;
}
