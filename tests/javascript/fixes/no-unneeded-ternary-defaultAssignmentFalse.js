/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-unneeded-ternary: ["error", { "defaultAssignment": false }]*/

  var a = x ? x : 1;

  f(x ? x : 1);
}
