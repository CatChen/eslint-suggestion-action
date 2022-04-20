/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint dot-notation: "error"*/

  var x = foo["bar"];
}

function correct() {
    /*eslint dot-notation: "error"*/

    var x = foo.bar;

    var x = foo[bar];    // Property name is a variable, square-bracket notation required
}

function allowKeywordsFalse() {
  function correct() {
    /*eslint dot-notation: ["error", { "allowKeywords": false }]*/

    var foo = { "class": "CS 101" }
    var x = foo["class"]; // Property name is a reserved word, square-bracket notation required
  }
}

function allowPattern() {
  function correct() {
    /*eslint camelcase: "error"*/
    /*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

    var data = {};
    data.foo_bar = 42;

    var data = {};
    data["fooBar"] = 42;

    var data = {};
    data["foo_bar"] = 42; // no warning
  }  
}