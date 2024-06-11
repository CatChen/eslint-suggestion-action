/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
function correct() {
    /*eslint-env es6*/

  let timer;
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
  timer = setInterval(initialize, 100);
}
