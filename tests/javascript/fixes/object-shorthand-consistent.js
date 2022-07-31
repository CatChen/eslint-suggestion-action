/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, no-undef */
function incorrect() {
  /*eslint object-shorthand: [2, "consistent"]*/
  /*eslint-env es6*/

  var foo = {
    a,
    b: "foo",
  };
}

function correct() {
  /*eslint object-shorthand: [2, "consistent"]*/
  /*eslint-env es6*/

  var foo = {
    a: a,
    b: "foo"
  };

  var bar = {
    a,
    b,
  };
}
