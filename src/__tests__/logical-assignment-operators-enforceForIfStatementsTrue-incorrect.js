/* eslint-disable */
/* eslint-enable logical-assignment-operators */
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/
if (a) a = b // <=> a &&= b
if (!a) a = b // <=> a ||= b

if (a == null) a = b // <=> a ??= b
if (a === null || a === undefined) a = b // <=> a ??= b
