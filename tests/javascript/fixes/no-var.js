/* eslint-disable */
/* eslint-enable no-var */
/*eslint no-var: "error"*/
function incorrect() {
  var x = "y";
  var CONFIG = {};
}

function correct() {
  /*eslint-env es6*/

  let x = "y";
  const CONFIG = {};
}
