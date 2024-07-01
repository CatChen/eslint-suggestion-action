/* eslint-disable */
/* eslint-enable prefer-named-capture-group */
/*eslint prefer-named-capture-group: "error"*/
function incorrect() {
  const foo = /(ba[rz])/;
  const bar = new RegExp('(ba[rz])');
  const baz = RegExp('(ba[rz])');
  
  foo.exec('bar')[1]; // Retrieve the group result.
}

function correct() {
  const foo = /(?<id>ba[rz])/;
  const bar = new RegExp('(?<id>ba[rz])');
  const baz = RegExp('(?<id>ba[rz])');
  const xyz = /xyz(?:zy|abc)/;
  
  foo.exec('bar').groups.id; // Retrieve the group result.
}
