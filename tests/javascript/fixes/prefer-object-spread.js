/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint prefer-object-spread: "error"*/

  Object.assign({}, foo)

  Object.assign({}, {foo: 'bar'})

  Object.assign({ foo: 'bar'}, baz)

  Object.assign({ foo: 'bar' }, Object.assign({ bar: 'foo' }))

  Object.assign({}, { foo, bar, baz })

  Object.assign({}, { ...baz })

  // Object.assign with a single argument that is an object literal
  Object.assign({});

  Object.assign({ foo: bar });
}

function correct() {
  /*eslint prefer-object-spread: "error"*/

  Object.assign(...foo);

  // Any Object.assign call without an object literal as the first argument
  Object.assign(foo, { bar: baz });

  Object.assign(foo, Object.assign(bar));

  Object.assign(foo, { bar, baz })

  Object.assign(foo, { ...baz });
}
