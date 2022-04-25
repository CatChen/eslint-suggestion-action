/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-bracket-newline: ["error", "consistent"]*/

  var a = [1
  ];
  var b = [
    1];
  var c = [function foo() {
    dosomething();
  }
  ]
  var d = [
    function foo() {
      dosomething();
    }]
}

function correct() {
  /*eslint array-bracket-newline: ["error", "consistent"]*/

  var a = [];
  var b = [
  ];
  var c = [1];
  var d = [
    1
  ];
  var e = [function foo() {
    dosomething();
  }];
  var f = [
    function foo() {
      dosomething();
    }
  ];
}
