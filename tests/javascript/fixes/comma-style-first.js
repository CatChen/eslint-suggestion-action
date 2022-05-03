/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint comma-style: ["error", "first"]*/

  var foo = 1,
      bar = 2;

  var foo = ["apples",
            "oranges"];

  function bar() {
    return {
      "a": 1,
      "b:": 2
    };
  }
}

function correct() {
  /*eslint comma-style: ["error", "first"]*/

  var foo = 1, bar = 2;

  var foo = 1
      ,bar = 2;

  var foo = ["apples"
            ,"oranges"];

  function bar() {
    return {
      "a": 1
      ,"b:": 2
    };
  }
}
