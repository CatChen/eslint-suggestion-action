/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-constant-condition */
function incorrect() {
  /*eslint no-confusing-arrow: ["error", {"allowParens": false}]*/
  /*eslint-env es6*/
  var x = a => (1 ? 2 : 3);
  var x = (a) => (1 ? 2 : 3);
}
