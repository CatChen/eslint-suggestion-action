/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": false}]*/
const timer = setInterval(initialize, 100);
function initialize() {
  if (foo()) {
    clearInterval(timer);
  }
}
