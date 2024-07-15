/* eslint-disable */
/* eslint-enable dot-notation */
/*eslint dot-notation: "error"*/
function incorrect() {
  var x = foo["bar"];
}

function correct() {
    var x = foo.bar;

    var x = foo[bar];    // Property name is a variable, square-bracket notation required
}

/*eslint dot-notation: ["error", { "allowKeywords": false }]*/
function correct() {
  var foo = { "class": "CS 101" }
  var x = foo["class"]; // Property name is a reserved word, square-bracket notation required

  class C {
    #in;
    foo() {
        this.#in; // Dot notation is required for private identifiers
    }
  }
}

/*eslint camelcase: "error"*/
function correct() {
  /*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

  var data = {};
  data["foo_bar"] = 42; // no warning
}  
