/* eslint-disable */
/* eslint-enable no-unsafe-negation */
/*eslint no-unsafe-negation: "error"*/
function incorrect() {
   
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
   
  if (!(key in object)) {
    // key is not in object
  }

   
  if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
  }
}

function incorrect() {
  if (!(foo) in object) {
    // this is not an allowed exception
  }
}

function correct() {
  if ((!foo) in object) {
    // allowed, because the negation is explicitly wrapped in parentheses
    // it is equivalent to (foo ? "false" : "true") in object
    // this is allowed as an exception for rare situations when that is the intended meaning
  }

  if(("" + !foo) in object) {
    // you can also make the intention more explicit, with type conversion
  }
}

/*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/
function incorrect() {
  if (! a < b) {}

  while (! a > b) {}

  foo = ! a <= b;

  foo = ! a >= b;
}

