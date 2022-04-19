function incorrect() {
  /*eslint valid-typeof: "error"*/

  typeof foo === "strnig";
  typeof foo == "undefimed";
  typeof bar != "nunber";
  typeof bar !== "fucntion";
}

function correct() {
  /*eslint valid-typeof: "error"*/

  typeof foo === "string";
  typeof bar == "undefined";
  typeof foo === baz;
  typeof bar === typeof qux;
}

function requireStringLiteralsTrue() {
  function incorrect() {
    /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

    typeof foo === undefined;
    typeof bar == Object;
    typeof baz === "strnig";
    typeof qux === "some invalid type";
    typeof baz === anotherVariable;
    typeof foo == 5;
  }

  function correct() {
    /*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

    typeof foo === "undefined";
    typeof bar == "object";
    typeof baz === "string";
    typeof bar === typeof qux;
  }
}
