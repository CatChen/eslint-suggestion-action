/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint dot-notation: ["error", { "allowKeywords": false }]*/

  var foo = { "class": "CS 101" }
  var x = foo["class"]; // Property name is a reserved word, square-bracket notation required
}
