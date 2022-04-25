/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

  var c = [1,
    2];
  var d = [1, 2, 3];
  var e = [
    function foo() {
      dosomething();
    }, function bar() {
      dosomething();
    }
  ];
}

function correct() {
  /*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

  var a = [];
  var b = [1];
  var c = [1, 2];
  var d = [1,
    2,
    3];
  var e = [
    function foo() {
      dosomething();
    },
    function bar() {
      dosomething();
    }
  ];
}
