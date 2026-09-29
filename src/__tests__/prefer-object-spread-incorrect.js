/* eslint-disable */
/* eslint-enable prefer-object-spread */
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
