/* eslint-disable */
/* eslint-enable object-shorthand */
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
var foo = {
  foo(bar, baz) {
    return bar + baz;
  },

  qux: foobar => foobar * 2
};
