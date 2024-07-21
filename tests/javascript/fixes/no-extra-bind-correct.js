/* eslint-disable */
/* eslint-enable no-extra-bind */
/*eslint no-extra-bind: "error"*/
var x = function () {
  this.foo();
}.bind(bar);

var x = function (a) {
  return a + 1;
}.bind(foo, bar);
