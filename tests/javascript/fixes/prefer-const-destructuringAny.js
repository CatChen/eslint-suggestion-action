/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
function incorrect() {
  /*eslint-env es6*/

  let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
  a = a + 1;
}

function correct() {
  /*eslint-env es6*/

  // using const.
  const {a: a0, b} = obj;
  const a = a0 + 1;

  // all variables are reassigned.
  let {a, b} = obj;
  a = a + 1;
  b = b + 1;
}
