/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: "error"*/
function incorrect() {
  var s = "" + foo;
  var s = `` + foo;
  foo += "";
  foo += ``;
}

function correct() {
  var s = String(foo);
  foo = String(foo);
}
