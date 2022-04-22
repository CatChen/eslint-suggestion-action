/* eslint-disable @typescript-eslint/no-unused-vars, no-redeclare */
function incorrect() {
  /*eslint one-var-declaration-per-line: ["error", "initializations"]*/
  /*eslint-env es6*/

  var a, b, c = 0;

  let a,
      b = 0, c;
}

function correct() {
  /*eslint one-var-declaration-per-line: ["error", "initializations"]*/
  /*eslint-env es6*/

  var a, b;

  let a,
      b;

  let a,
      b = 0;
}
