/* eslint-disable */
/* eslint-enable quote-props */
function incorrect() {
  /*eslint quote-props: ["error", "consistent-as-needed", { "keywords": true }]*/

  var x = {
    "prop": 1,
    "bar": "foo"
  };
}
