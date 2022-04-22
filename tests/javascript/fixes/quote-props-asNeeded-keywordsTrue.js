/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint quote-props: ["error", "as-needed", { "keywords": true }]*/

  var x = {
    while: 1,
    volatile: "foo"
  };
}
