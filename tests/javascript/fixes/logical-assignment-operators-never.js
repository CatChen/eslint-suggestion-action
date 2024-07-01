/* eslint-disable */
/* eslint-enable logical-assignment-operators */
/*eslint logical-assignment-operators: ["error", "never"]*/
function incorrect() {
  a ||= b
  a &&= b
  a ??= b
}

function correct() {
  a = a || b
  a = a && b
  a = a ?? b
}