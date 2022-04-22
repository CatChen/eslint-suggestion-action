/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, no-undef */
function incorrect() {
  /*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
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
  /*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
  /*eslint-env es6*/

  var foo = {
    foo(bar, baz) {
      return bar + baz;
    },

    qux: foobar => foobar * 2
  };
}
