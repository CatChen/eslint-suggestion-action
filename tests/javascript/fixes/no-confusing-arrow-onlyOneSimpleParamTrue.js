/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-constant-condition */
function correct() {
  /*eslint no-confusing-arrow: ["error", {"onlyOneSimpleParam": true}]*/
  /*eslint-env es6*/
  () => 1 ? 2 : 3;
  (a, b) => 1 ? 2 : 3;
  (a = b) => 1 ? 2 : 3;
  ({ a }) => 1 ? 2 : 3;
  ([a]) => 1 ? 2 : 3;
  (...a) => 1 ? 2 : 3;
}
