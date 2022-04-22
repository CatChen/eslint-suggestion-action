/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-implicit-coercion: "error"*/

  var b = !!foo;
  var b = ~foo.indexOf(".");
  // bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.
}

function correct() {
  /*eslint no-implicit-coercion: "error"*/

  var b = Boolean(foo);
  var b = foo.indexOf(".") !== -1;

  var n = ~foo; // This is a just bitwise not.
}
