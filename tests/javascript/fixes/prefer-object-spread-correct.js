/* eslint-disable */
/* eslint-enable prefer-object-spread */
/*eslint prefer-object-spread: "error"*/
Object.assign(...foo);

// Any Object.assign call without an object literal as the first argument
Object.assign(foo, { bar: baz });

Object.assign(foo, Object.assign(bar));

Object.assign(foo, { bar, baz })

Object.assign(foo, { ...baz });
