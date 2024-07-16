/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: "error"*/
function incorrect() {
  var b = !!foo;
}

function correct() {
  var b = Boolean(foo);
}

/*eslint no-implicit-coercion: "error"*/
function incorrect() {
  var b = !!foo;
  var b = ~foo.indexOf(".");
  // bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.
}

function correct() {
  var b = Boolean(foo);
  var b = foo.indexOf(".") !== -1;

  var n = ~foo; // This is a just bitwise not.
}

/*eslint no-implicit-coercion: [2, { "allow": ["!!", "~"] } ]*/
function correct() {
  var b = !!foo;
  var b = ~foo.indexOf(".");
}
