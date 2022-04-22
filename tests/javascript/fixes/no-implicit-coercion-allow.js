/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint no-implicit-coercion: [2, { "allow": ["!!", "~"] } ]*/

  var b = !!foo;
  var b = ~foo.indexOf(".");
}
