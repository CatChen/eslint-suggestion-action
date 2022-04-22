/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /* eslint prefer-destructuring: ["error", {"VariableDeclarator": {"object": true}}] */
  var {bar: foo} = object;
}
