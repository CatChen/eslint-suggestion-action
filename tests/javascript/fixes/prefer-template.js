/* eslint-disable */
/* eslint-enable prefer-template */
/*eslint prefer-template: "error"*/
function incorrect() {
  var str = "Hello, " + name + "!";
  var str = "Time: " + (12 * 60 * 60 * 1000);
}

function correct() {
  /*eslint-env es6*/

  var str = "Hello World!";
  var str = `Hello, ${name}!`;
  var str = `Time: ${12 * 60 * 60 * 1000}`;

  // This is reported by `no-useless-concat`.
  var str = "Hello, " + "World!";
}
