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
