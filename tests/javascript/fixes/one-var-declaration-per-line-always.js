/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var-declaration-per-line: ["error", "always"]*/
function incorrect() {
  /*eslint-env es6*/

  var a, b;

  let a, b = 0;

  const a = 0, b = 0;
}

function correct() {
  /*eslint-env es6*/

  var a,
      b;

  let a,
      b = 0;
}  
