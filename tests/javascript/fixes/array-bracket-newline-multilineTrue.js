/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-bracket-newline: ["error", { "multiline": true }]*/

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
  /*eslint array-bracket-newline: ["error", { "multiline": true }]*/

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