/* eslint-disable */
/* eslint-enable no-unsafe-negation */
/*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/
function incorrect() {
  if (! a < b) {}

  while (! a > b) {}

  foo = ! a <= b;

  foo = ! a >= b;
}
