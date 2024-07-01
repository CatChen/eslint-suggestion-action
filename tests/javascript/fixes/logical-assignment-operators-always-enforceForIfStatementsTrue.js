/* eslint-disable */
/* eslint-enable logical-assignment-operators */
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/
function incorrect() {
  if (a) a = b // <=> a &&= b
  if (!a) a = b // <=> a ||= b
  
  if (a == null) a = b // <=> a ??= b
  if (a === null || a === undefined) a = b // <=> a ??= b
}

function correct() {
  if (a) b = c
  if (a === 0) a = b
}
