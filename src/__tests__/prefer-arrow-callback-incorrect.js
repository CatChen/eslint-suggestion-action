/* eslint-disable */
/* eslint-enable prefer-arrow-callback */
/* eslint prefer-arrow-callback: "error" */
foo(function(a) { return a; }); // ERROR
// prefer: foo(a => a)

foo(function() { return this.a; }.bind(this)); // ERROR
// prefer: foo(() => this.a)
