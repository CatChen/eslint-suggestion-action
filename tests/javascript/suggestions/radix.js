/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint radix: "error"*/

  var num = parseInt("071");

  var num = parseInt(someValue);

  var num = parseInt("071", "abc");

  var num = parseInt("071", 37);

  var num = parseInt();
}

function correct() {
  /*eslint radix: "error"*/

  var num = parseInt("071", 10);

  var num = parseInt("071", 8);

  var num = parseFloat(someValue);
}

function asNeeded() {
  function incorrect() {
    /*eslint radix: ["error", "as-needed"]*/

    var num = parseInt("071", 10);

    var num = parseInt("071", "abc");

    var num = parseInt();
  }
  
  function correct() {
    /*eslint radix: ["error", "as-needed"]*/

    var num = parseInt("071");

    var num = parseInt("071", 8);

    var num = parseFloat(someValue);
  }  
}