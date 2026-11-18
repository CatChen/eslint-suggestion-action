/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: "error"*/
var b = !!foo;
var b = ~foo.indexOf(".");
// bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.
