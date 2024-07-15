/* eslint-disable */
/* eslint-enable no-extra-boolean-cast */
/*eslint no-extra-boolean-cast: "error"*/
var foo = !!bar;
var foo = Boolean(bar);

function foo() {
    return !!bar;
}

var foo = bar ? !!baz : !!bat;
