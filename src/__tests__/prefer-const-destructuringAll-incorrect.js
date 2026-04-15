/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/
// all of `a` and `b` should be const, so those are warned.
let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                             'b' is never reassigned, use 'const' instead.*/
