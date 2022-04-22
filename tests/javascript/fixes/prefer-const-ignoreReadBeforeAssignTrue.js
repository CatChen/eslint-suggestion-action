/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-const-assign, no-constant-condition */
function correct() {
  /*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
  /*eslint-env es6*/

  let timer;
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
  timer = setInterval(initialize, 100);
}
