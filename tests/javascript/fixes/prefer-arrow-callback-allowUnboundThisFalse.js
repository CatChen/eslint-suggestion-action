/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /* eslint prefer-arrow-callback: [ "error", { "allowUnboundThis": false } ] */
  /* eslint-env es6 */

  foo(function() { this.a; });

  foo(function() { (() => this); });

  someArray.map(function(item) { return this.doSomething(item); }, someObject);
}
