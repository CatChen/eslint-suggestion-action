/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/
// 'b' is never reassigned, but all of `a` and `b` should not be const, so those are ignored.
let {a, b} = obj;
a = a + 1;
