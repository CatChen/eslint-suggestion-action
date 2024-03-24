/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint no-undef-init: "error"*/

  var foo = undefined;
  let bar = undefined;
}

function correct() {
  /*eslint no-undef-init: "error"*/

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
