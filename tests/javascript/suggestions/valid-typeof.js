// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line no-undef
  typeof foo === baz
  typeof bar === typeof qux
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function requireStringLiteralsTrue() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  function incorrect() {
    /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

    typeof foo === undefined
    typeof bar == Object
    typeof baz === "strnig"
    typeof qux === "some invalid type"
    // eslint-disable-next-line no-undef
    typeof baz === anotherVariable
    typeof foo == 5
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  function correct() {
    /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

    typeof foo === "undefined"
    typeof bar == "object"
    typeof baz === "string"
    typeof bar === typeof qux
  }
}
