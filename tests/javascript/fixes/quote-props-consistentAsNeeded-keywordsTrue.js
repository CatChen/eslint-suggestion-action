/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint quote-props: ["error", "consistent-as-needed", { "keywords": true }]*/

  var x = {
    "prop": 1,
    "bar": "foo"
  };
}
