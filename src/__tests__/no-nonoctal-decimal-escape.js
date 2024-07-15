/* eslint-disable */
/* eslint-enable no-nonoctal-decimal-escape */
/*eslint no-nonoctal-decimal-escape: "error"*/
function incorrect() {
  "\8";

  "\9";

  var foo = "w\8less";

  var bar = "December 1\9";

  var baz = "Don't use \8 and \9 escapes.";

  var quux = "\0\8";
}

function correct() {
  "8";

  "9";

  var foo = "w8less";

  var bar = "December 19";

  var baz = "Don't use \\8 and \\9 escapes.";

  var quux = "\0\u0038";
}
