/* eslint-disable */
/* eslint-enable no-unneeded-ternary */
/*eslint no-unneeded-ternary: "error"*/
function incorrect() {
  var a = x === 2 ? true : false;

  var a = x ? true : false;
}

function correct() {
  var a = x === 2 ? "Yes" : "No";

  var a = x !== false;

  var a = x ? "Yes" : "No";

  var a = x ? y : x;

  f(x ? x : 1); // default assignment - would be disallowed if defaultAssignment option set to false. See option details below.
}
