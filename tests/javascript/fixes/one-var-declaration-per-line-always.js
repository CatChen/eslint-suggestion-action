/* eslint-disable @typescript-eslint/no-unused-vars, no-redeclare */
function incorrect() {
  /*eslint one-var-declaration-per-line: ["error", "always"]*/
  /*eslint-env es6*/

  var a, b;

  let a, b = 0;

  const a = 0, b = 0;
}

function correct() {
  /*eslint one-var-declaration-per-line: ["error", "always"]*/
  /*eslint-env es6*/

  var a,
      b;

  let a,
      b = 0;
}  
