/* eslint-disable @typescript-eslint/no-unused-vars, no-redeclare */
function incorrect() {
  /*eslint no-floating-decimal: "error"*/

  var num = .5;
  var num = 2.;
  var num = -.7;
}

function correct() {
  /*eslint no-floating-decimal: "error"*/

  var num = 0.5;
  var num = 2.0;
  var num = -0.7;
}
