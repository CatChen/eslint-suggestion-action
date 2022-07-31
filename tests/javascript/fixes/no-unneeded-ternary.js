/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-unneeded-ternary: "error"*/

  var a = x === 2 ? true : false;

  var a = x ? true : false;
}

function correct() {
  /*eslint no-unneeded-ternary: "error"*/

  var a = x === 2 ? "Yes" : "No";

  var a = x !== false;

  var a = x ? "Yes" : "No";

  var a = x ? y : x;

  f(x ? x : 1); // default assignment - would be disallowed if defaultAssignment option set to false. See option details below.
}
