/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-regex-spaces: "error"*/

  var re = /foo   bar/;
  var re = new RegExp("foo   bar");
}

function correct() {
  /*eslint no-regex-spaces: "error"*/

  var re = /foo {3}bar/;
  var re = new RegExp("foo {3}bar");
}
