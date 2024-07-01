/* eslint-disable */
/* eslint-enable quote-props */
/*eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }]*/
function correct() {
  var x = {
    "while": 1,
    "foo": "bar"  // Would normally have caused a warning
  };
}
