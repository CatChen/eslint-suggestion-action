/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

  typeof foo === undefined
  typeof bar == Object
  typeof baz === "strnig"
  typeof qux === "some invalid type"
  typeof baz === anotherVariable
  typeof foo == 5
}

function correct() {
  /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

  typeof foo === "undefined"
  typeof bar == "object"
  typeof baz === "string"
  typeof bar === typeof qux
}
