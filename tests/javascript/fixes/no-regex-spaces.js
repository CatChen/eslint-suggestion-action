/* eslint-disable */
/* eslint-enable no-regex-spaces */
/*eslint no-regex-spaces: "error"*/
function incorrect() {
  var re = /foo   bar/;
  var re = new RegExp("foo   bar");
}

function correct() {
  var re = /foo {3}bar/;
  var re = new RegExp("foo {3}bar");
}
