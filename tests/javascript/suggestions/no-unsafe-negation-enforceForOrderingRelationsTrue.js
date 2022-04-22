/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/

  if (! a < b) {}

  while (! a > b) {}

  foo = ! a <= b;

  foo = ! a >= b;
}
