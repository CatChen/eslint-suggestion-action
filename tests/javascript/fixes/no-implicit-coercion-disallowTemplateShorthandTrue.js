/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

  var s = `${foo}`;
}

function correct() {
  /*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

  var s = String(foo);

  var s = `a${foo}`;

  var s = `${foo}b`;

  var s = `${foo}${bar}`;

  var s = tag`${foo}`;
}
