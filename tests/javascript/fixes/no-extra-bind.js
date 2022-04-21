/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-extra-bind: "error"*/
  /*eslint-env es6*/

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
}

function correct() {
  /*eslint no-extra-bind: "error"*/

  var x = function () {
    this.foo();
  }.bind(bar);

  var x = function (a) {
    return a + 1;
  }.bind(foo, bar);
}
