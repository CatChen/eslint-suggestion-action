/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-element-newline: ["error", "always"]*/

  var c = [1, 2];
  var d = [1, 2, 3];
  var e = [1, 2, 3
  ];
  var f = [
    1, 2, 3
  ];
  var g = [
    function foo() {
      dosomething();
    }, function bar() {
      dosomething();
    }
  ];
}

function correct() {
  /*eslint array-element-newline: ["error", "always"]*/

  var a = [];
  var b = [1];
  var c = [1,
    2];
  var d = [1,
    2,
    3];
  var d = [
    1, 
    2, 
    3
  ];
  var e = [
    function foo() {
      dosomething();
    },
    function bar() {
      dosomething();
    }
  ];
}
