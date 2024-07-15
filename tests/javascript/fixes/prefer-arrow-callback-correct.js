/* eslint-disable */
/* eslint-enable prefer-arrow-callback */
/* eslint prefer-arrow-callback: "error" */
// arrow function callback
foo(a => a); // OK

// generator as callback
foo(function*() { yield; }); // OK

// function expression not used as callback or function argument
var foo = function foo(a) { return a; }; // OK

// unbound function expression callback
foo(function() { return this.a; }); // OK

// recursive named function callback
foo(function bar(n) { return n && n + bar(n - 1); }); // OK
