/* eslint-disable */
/* eslint-enable logical-assignment-operators */
/*eslint logical-assignment-operators: ["error", "always"]*/
// Incorrect Code
a = a || b
a = a && b
a = a ?? b
a || (a = b)
a && (a = b)
a ?? (a = b)
a = a || b || c
a = a && b && c
a = a ?? b ?? c

// Correct
a = b
a += b
a ||= b
a = b || c
a || (b = c)

if (a) a = b

a = (a || b) || c

/*eslint logical-assignment-operators: ["error", "never"]*/
// Incorrect Code
a ||= b
a &&= b
a ??= b

// Correct Code
a = a || b
a = a && b
a = a ?? b

/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/
// Incorrect Code
if (a) a = b // <=> a &&= b
if (!a) a = b // <=> a ||= b

if (a == null) a = b // <=> a ??= b
if (a === null || a === undefined) a = b // <=> a ??= b

// Correct Code
if (a) b = c
if (a === 0) a = b
