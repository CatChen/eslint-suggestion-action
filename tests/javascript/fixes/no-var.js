/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /*eslint no-var: "error"*/

  var x = "y";
  var CONFIG = {};
}

function correct() {
  /*eslint no-var: "error"*/
  /*eslint-env es6*/

  let x = "y";
  const CONFIG = {};
}
