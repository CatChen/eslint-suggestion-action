/* eslint-disable */
/* eslint-enable object-shorthand */
/*eslint object-shorthand: [2, "consistent"]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    a,
    b: "foo",
  };
}

function correct() {
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
