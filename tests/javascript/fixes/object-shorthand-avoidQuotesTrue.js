/* eslint-disable */
/* eslint-enable object-shorthand */
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    "bar-baz"() {}
  };
}

function correct() {
  /*eslint-env es6*/

  var foo = {
    "bar-baz": function() {},
    "qux": qux
  };
}
