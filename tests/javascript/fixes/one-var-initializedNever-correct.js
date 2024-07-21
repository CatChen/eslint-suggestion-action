/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { "initialized": "never" }]*/
function foo() {
  var foo = true;
  var bar = false;
  var a, b, c; // Uninitialized variables are ignored
}
