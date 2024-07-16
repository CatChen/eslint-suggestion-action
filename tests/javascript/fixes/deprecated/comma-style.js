/* eslint-disable */
/* eslint-enable comma-style */
/*eslint comma-style: ["error", "last"]*/
function incorrect() {
  var foo = 1
  ,
  bar = 2;

  var foo = 1
    , bar = 2;

  var foo = ["apples"
            , "oranges"];

  function bar() {
    return {
      "a": 1
      ,"b:": 2
    };
  }
}

function correct() {
  var foo = 1, bar = 2;

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
