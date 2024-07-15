/* eslint-disable */
/* eslint-enable object-shorthand */
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    foo: (bar, baz) => {
      return bar + baz;
    },

    qux: (foobar) => {
      return foobar * 2;
    }
  };
}

function correct() {
  /*eslint-env es6*/

  var foo = {
    foo(bar, baz) {
      return bar + baz;
    },

    qux: foobar => foobar * 2
  };
}
