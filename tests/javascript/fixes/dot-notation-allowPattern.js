/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint camelcase: "error"*/
  /*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

  var data = {};
  data["foo_bar"] = 42; // no warning
}  
