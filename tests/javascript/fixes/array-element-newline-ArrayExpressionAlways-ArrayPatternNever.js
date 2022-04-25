/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

  var a = [1, 2];
  var b = [1, 2, 3];
  var c = [
    function foo() {
      dosomething();
    }, function bar() {
      dosomething();
    }
  ];

  var [d,
    e] = arr;
  var [f,
    g,
    h] = arr;
  var [i = function foo() {
    dosomething()
  },
  j = function bar() {
    dosomething()
  }] = arr
}

function correct() {
  /*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

  var a = [1,
    2];
  var b = [1,
    2,
    3];
  var c = [
    function foo() {
      dosomething();
    },
    function bar() {
      dosomething();
    }
  ];

  var [d, e] = arr
  var [f, g, h] = arr
  var [i = function foo() {
    dosomething()
  }, j = function bar() {
    dosomething()
  }] = arr
}
