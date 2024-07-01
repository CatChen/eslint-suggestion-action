/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: "error"*/
function incorrect() {
    var b = !!foo;
    var b = ~foo.indexOf(".");
    // bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.

    var n = +foo;
    var n = -(-foo);
    var n = foo - 0;
    var n = 1 * foo;

    var s = "" + foo;
    var s = `` + foo;
    foo += "";
    foo += ``;
}

function correct() {
    var b = Boolean(foo);
    var b = foo.indexOf(".") !== -1;
    
    var n = ~foo; // This is a just bitwise not.

    var n = Number(foo);
    var n = parseFloat(foo);
    var n = parseInt(foo, 10);

    var n = foo * 1/4; // `* 1` is allowed when followed by the `/` operator

    var s = String(foo);
    foo = String(foo);
}
