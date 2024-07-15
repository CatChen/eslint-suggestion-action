/* eslint-disable */
/* eslint-enable dot-notation */
/*eslint camelcase: "error"*/
function correct() {
  /*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

  var data = {};
  data["foo_bar"] = 42; // no warning
}  
