/* eslint-disable */
/* eslint-enable no-object-constructor */
/*eslint no-object-constructor: "error"*/
Object("foo");

const obj = { a: 1, b: 2 };

const isObject = value => value === Object(value);

const createObject = Object => new Object();
