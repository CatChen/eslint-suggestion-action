/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: [2, { "allow": ["!!", "~"] } ]*/
function correct() {
  var b = !!foo;
  var b = ~foo.indexOf(".");
}
