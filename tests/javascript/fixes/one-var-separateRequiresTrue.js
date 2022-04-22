/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-var-requires */
function incorrect() {
  /*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
  /*eslint-env node*/

  var foo = require("foo"),
      bar = "bar";
}

function correct() {
  /*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
  /*eslint-env node*/

  var foo = require("foo");
  var bar = "bar";

  var foo = require("foo"),
      bar = require("bar");
}
