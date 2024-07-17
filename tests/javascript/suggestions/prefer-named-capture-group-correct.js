/* eslint-disable */
/* eslint-enable prefer-named-capture-group */
/*eslint prefer-named-capture-group: "error"*/
const foo = /(?<id>ba[rz])/;
const bar = new RegExp('(?<id>ba[rz])');
const baz = RegExp('(?<id>ba[rz])');
const xyz = /xyz(?:zy|abc)/;

foo.exec('bar').groups.id; // Retrieve the group result.
