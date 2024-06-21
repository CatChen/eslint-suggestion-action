/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/
function incorrect() {
  /*eslint-env es6*/

  var a, b, c = 0;

  let a,
      b = 0, c;
}

function correct() {
  /*eslint-env es6*/

  var a, b;

  let a,
      b;

  let a,
      b = 0;
}
