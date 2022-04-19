// eslint-disable-next-line @typescript-eslint/no-unused-vars
function incorrect() {
  /*eslint no-unsafe-negation: "error"*/

  // eslint-disable-next-line no-undef
  if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
  }

  // eslint-disable-next-line no-undef
  if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function correct() {
  /*eslint no-unsafe-negation: "error"*/

  // eslint-disable-next-line no-undef
  if (!(key in object)) {
    // key is not in object
  }

  // eslint-disable-next-line no-undef
  if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function exception() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function correct() {
    /*eslint no-unsafe-negation: "error"*/

    // eslint-disable-next-line no-undef
    if ((!foo) in object) {
      // allowed, because the negation is explicitly wrapped in parentheses
      // it is equivalent to (foo ? "false" : "true") in object
      // this is allowed as an exception for rare situations when that is the intended meaning
    }

    // eslint-disable-next-line no-undef
    if(("" + !foo) in object) {
      // you can also make the intention more explicit, with type conversion
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function incorrect() {
    /*eslint no-unsafe-negation: "error"*/

    // eslint-disable-next-line no-undef
    if (!(foo) in object) {
      // this is not an allowed exception
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function enforceForOrderingRelationsTrue() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function incorrect() {
    /*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/

    // eslint-disable-next-line no-undef, no-empty
    if (! a < b) {}

    // eslint-disable-next-line no-undef, no-empty
    while (! a > b) {}

    // eslint-disable-next-line no-undef
    foo = ! a <= b;

    // eslint-disable-next-line no-undef
    foo = ! a >= b;
  }
}
