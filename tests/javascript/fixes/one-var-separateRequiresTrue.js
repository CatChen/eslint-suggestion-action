/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
function incorrect() {
  /*eslint-env node*/

  var foo = require("foo"),
      bar = "bar";
}

function correct() {
  /*eslint-env node*/

  () => {
    var foo = require("foo");
    var bar = "bar";
  }

  () => {
    var foo = require("foo"),
        bar = require("bar");
  }
}
