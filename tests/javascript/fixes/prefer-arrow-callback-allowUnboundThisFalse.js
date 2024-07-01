/* eslint-disable */
/* eslint-enable prefer-arrow-callback */
/* eslint prefer-arrow-callback: [ "error", { "allowUnboundThis": false } ] */
function incorrect() {
  /* eslint-env es6 */

  foo(function() { this.a; });

  foo(function() { (() => this); });

  someArray.map(function(item) { return this.doSomething(item); }, someObject);
}
