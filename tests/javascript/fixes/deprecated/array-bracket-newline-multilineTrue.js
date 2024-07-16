/* eslint-disable */
/* eslint-enable array-bracket-newline */
/*eslint array-bracket-newline: ["error", { "multiline": true }]*/
function incorrect() {
  var a = [
  ];
  var b = [
    1
  ];
  var c = [
    1, 2
  ];
  var d = [1,
    2];
  var e = [function foo() {
    dosomething();
  }];
}

function correct() {
  var a = [];
  var b = [1];
  var c = [1, 2];
  var d = [
    1,
    2
  ];
  var e = [
    function foo() {
      dosomething();
    }
  ];
}
