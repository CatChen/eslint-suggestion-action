/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-implicit-coercion: "error"*/

  var n = +foo;
  var n = 1 * foo;
}

function correct() {
  /*eslint no-implicit-coercion: "error"*/

  var n = Number(foo);
  var n = parseFloat(foo);
  var n = parseInt(foo, 10);
}
