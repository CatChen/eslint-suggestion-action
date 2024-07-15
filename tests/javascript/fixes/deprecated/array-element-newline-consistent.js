/* eslint-disable */
/* eslint-enable array-element-newline */
/*eslint array-element-newline: ["error", "consistent"]*/
function incorrect() {
  var a = [
    1, 2,
    3
  ];
  var b = [
    function foo() {
      dosomething();
    }, function bar() {
      dosomething();
    },
    function baz() {
      dosomething();
    }
  ];
}

function correct() {
  var a = [];
  var b = [1];
  var c = [1, 2];
  var d = [1, 2, 3];
  var e = [
    1,
    2
  ];
  var f = [
    1,
    2,
    3
  ];
  var g = [
    function foo() {
      dosomething();
    }, function bar() {
      dosomething();
    }, function baz() {
      dosomething();
    }
  ];
  var h = [
    function foo() {
      dosomething();
    },
    function bar() {
      dosomething();
    },
    function baz() {
      dosomething();
      }
  ];
}
