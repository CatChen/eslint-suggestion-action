/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint valid-typeof: "error"*/

  typeof foo === "strnig"
  typeof foo == "undefimed"
  typeof bar != "nunber"
  typeof bar !== "fucntion"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function correct() {
  /*eslint valid-typeof: "error"*/

  typeof foo === "string"
  typeof bar == "undefined"
  typeof foo === baz
  typeof bar === typeof qux
}
