/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
let timer;
function initialize() {
  if (foo()) {
    clearInterval(timer);
  }
}
timer = setInterval(initialize, 100);
