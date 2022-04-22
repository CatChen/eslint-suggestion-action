/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, no-undef */
function incorrect() {
  /*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
  /*eslint-env es6*/

  var foo = {
    "bar-baz"() {}
  };
}

function correct() {
  /*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
  /*eslint-env es6*/

  var foo = {
    "bar-baz": function() {},
    "qux": qux
  };
}
