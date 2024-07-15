/* eslint-disable */
/* eslint-enable prefer-arrow-callback */
/* eslint prefer-arrow-callback: "error" */
function incorrect() {
  foo(function(a) { return a; }); // ERROR
  // prefer: foo(a => a)

  foo(function() { return this.a; }.bind(this)); // ERROR
  // prefer: foo(() => this.a)
}

function correct() {
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