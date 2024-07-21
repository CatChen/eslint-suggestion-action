/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
// using const.
const {a: a0, b} = obj;
const a = a0 + 1;

// all variables are reassigned.
let {c, d} = obj;
c = c + 1;
d = d + 1;
