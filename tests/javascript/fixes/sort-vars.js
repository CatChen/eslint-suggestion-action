/* eslint-disable @typescript-eslint/no-unused-vars, no-redeclare */
function incorrect() {
  /*eslint sort-vars: "error"*/

  var b, a;

  var a, B, c;

  var a, A;
}

function correct() {
  /*eslint sort-vars: "error"*/

  var a, b, c, d;

  var _a = 10;
  var _b = 20;

  var A, a;

  var B, a, c;
}
