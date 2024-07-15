/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: "error"*/
function incorrect() {
  var n = +foo;
  var n = 1 * foo;
}

function correct() {
  var n = Number(foo);
  var n = parseFloat(foo);
  var n = parseInt(foo, 10);
}
