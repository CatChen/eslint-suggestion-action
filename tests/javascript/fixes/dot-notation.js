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
