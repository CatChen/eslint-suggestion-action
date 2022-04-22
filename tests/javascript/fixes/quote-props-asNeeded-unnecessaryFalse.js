/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }]*/

  var x = {
    "while": 1,
    "foo": "bar"  // Would normally have caused a warning
  };
}
