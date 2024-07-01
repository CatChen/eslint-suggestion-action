/* eslint-disable */
/* eslint-enable array-bracket-newline */
function incorrect() {
  /*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

  var a = [
  ];
  var b = [
    1
  ];
  var c = [1, 2];
  var d = [1,
    2];
  var e = [
    function foo() {
      dosomething();
    }
  ];
}

function correct() {
  /*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

  var a = [];
  var b = [1];
  var c = [
    1, 2
  ];
  var d = [
    1,
    2
  ];
  var e = [function foo() {
    dosomething();
  }];
}
