/* eslint-disable */
/* eslint-enable no-implicit-coercion */
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/
function incorrect() {
  var s = `${foo}`;
}

function correct() {
  var s = String(foo);

  var s = `a${foo}`;

  var s = `${foo}b`;

  var s = `${foo}${bar}`;

  var s = tag`${foo}`;
}
