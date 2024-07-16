/* eslint-disable */
/* eslint-enable no-confusing-arrow */
  /*eslint no-confusing-arrow: ["error", {"onlyOneSimpleParam": true}]*/
  function correct() {
  /*eslint-env es6*/
  () => 1 ? 2 : 3;
  (a, b) => 1 ? 2 : 3;
  (a = b) => 1 ? 2 : 3;
  ({ a }) => 1 ? 2 : 3;
  ([a]) => 1 ? 2 : 3;
  (...a) => 1 ? 2 : 3;
}
