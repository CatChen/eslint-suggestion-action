/* eslint-disable */
/* eslint-enable logical-assignment-operators */
/*eslint logical-assignment-operators: ["error", "always"]*/
function incorrect() {
  a = a || b
  a = a && b
  a = a ?? b
  a || (a = b)
  a && (a = b)
  a ?? (a = b)
  a = a || b || c
  a = a && b && c
  a = a ?? b ?? c
}

function correct() {
  a = b
  a += b
  a ||= b
  a = b || c
  a || (b = c)

  if (a) a = b

  a = (a || b) || c
}