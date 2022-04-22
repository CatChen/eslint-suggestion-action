/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint prefer-template: "error"*/

  var str = "Hello, " + name + "!";
  var str = "Time: " + (12 * 60 * 60 * 1000);
}

function correct() {
  /*eslint prefer-template: "error"*/
  /*eslint-env es6*/

  var str = "Hello World!";
  var str = `Hello, ${name}!`;
  var str = `Time: ${12 * 60 * 60 * 1000}`;

  // This is reported by `no-useless-concat`.
  var str = "Hello, " + "World!";
}
