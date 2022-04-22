/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /* eslint prefer-arrow-callback: "error" */

  foo(function(a) { return a; }); // ERROR
  // prefer: foo(a => a)

  foo(function() { return this.a; }.bind(this)); // ERROR
  // prefer: foo(() => this.a)
}

function correct() {
  /* eslint prefer-arrow-callback: "error" */
  /* eslint-env es6 */

  // arrow function callback
  foo(a => a); // OK

  // generator as callback
  foo(function*() { yield; }); // OK

  // function expression not used as callback or function argument
  var foo = function foo(a) { return a; }; // OK

  // unbound function expression callback
  foo(function() { return this.a; }); // OK

  // recursive named function callback
}
