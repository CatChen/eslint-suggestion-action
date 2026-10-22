/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
a = a + 1;
