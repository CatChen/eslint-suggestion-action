/* eslint-disable */
/* eslint-enable no-undef-init */
/*eslint no-undef-init: "error"*/
function incorrect() {
  var foo = undefined;
  let bar = undefined;
}

function correct() {
  var foo;
  let bar;

  const foo = undefined;

  let { bar = undefined } = baz;

  [quux = undefined] = quuux;

  (foo = undefined) => {};

  class Foo {
      bar = undefined;
  }
}
