/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-implicit-coercion: "error"*/

  var s = "" + foo;
  var s = `` + foo;
  foo += "";
  foo += ``;
}

function correct() {
  /*eslint no-implicit-coercion: "error"*/

  var s = String(foo);
  foo = String(foo);
}
