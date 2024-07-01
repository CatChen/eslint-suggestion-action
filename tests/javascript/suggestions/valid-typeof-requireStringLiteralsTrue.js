/* eslint-disable */
/* eslint-enable valid-typeof */
/*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/
function incorrect() {
  typeof foo === undefined
  typeof bar == Object
  typeof baz === "strnig"
  typeof qux === "some invalid type"
  typeof baz === anotherVariable
  typeof foo == 5
}

function correct() {
  typeof foo === "undefined"
  typeof bar == "object"
  typeof baz === "string"
  typeof bar === typeof qux
}
