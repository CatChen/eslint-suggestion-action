/* eslint-disable */
/* eslint-enable dot-notation */
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/
var foo = { "class": "CS 101" }
var x = foo["class"]; // Property name is a reserved word, square-bracket notation required

class C {
  #in;
  foo() {
      this.#in; // Dot notation is required for private identifiers
  }
}
