/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint no-unsafe-negation: "error"*/

  if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
  }

  if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
  }
}

function correct() {
  /*eslint no-unsafe-negation: "error"*/

  if (!(key in object)) {
    // key is not in object
  }

  if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
  }
}
