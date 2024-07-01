/* eslint-disable */
/* eslint-enable valid-typeof */
/*eslint valid-typeof: "error"*/
function incorrect() {
  typeof foo === "strnig"
  typeof foo == "undefimed"
  typeof bar != "nunber"
  typeof bar !== "fucntion"
}

function correct() {
  typeof foo === "string"
  typeof bar == "undefined"
  typeof foo === baz
  typeof bar === typeof qux
}
