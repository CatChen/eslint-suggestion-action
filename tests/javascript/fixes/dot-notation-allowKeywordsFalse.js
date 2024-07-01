/* eslint-disable */
/* eslint-enable dot-notation */
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/
function correct() {
  var foo = { "class": "CS 101" }
  var x = foo["class"]; // Property name is a reserved word, square-bracket notation required
}
