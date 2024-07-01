/* eslint-disable */
/* eslint-enable radix */
/*eslint radix: "error"*/
function incorrect() {
  var num = parseInt("071");

  var num = parseInt(someValue);

  var num = parseInt("071", "abc");

  var num = parseInt("071", 37);

  var num = parseInt();
}

function correct() {
  var num = parseInt("071", 10);

  var num = parseInt("071", 8);

  var num = parseFloat(someValue);
}
