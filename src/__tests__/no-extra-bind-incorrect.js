/* eslint-disable */
/* eslint-enable no-extra-bind */
/*eslint no-extra-bind: "error"*/
var x = function () {
  foo();
}.bind(bar);

var x = (() => {
  foo();
}).bind(bar);

var x = (() => {
  this.foo();
}).bind(bar);

var x = function () {
  (function () {
    this.foo();
  }());
}.bind(bar);

var x = function () {
  function foo() {
    this.bar();
  }
}.bind(baz);
