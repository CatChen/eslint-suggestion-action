/* eslint-disable */
/* eslint-enable prefer-named-capture-group */
/*eslint prefer-named-capture-group: "error"*/
const foo = /(ba[rz])/;
const bar = new RegExp('(ba[rz])');
const baz = RegExp('(ba[rz])');

foo.exec('bar')[1]; // Retrieve the group result.
