/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-const-assign, no-constant-condition */
function correct() {
  /*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": false}]*/
  /*eslint-env es6*/

  const timer = setInterval(initialize, 100);
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
}
