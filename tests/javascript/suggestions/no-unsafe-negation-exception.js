/* eslint-disable */
/* eslint-enable no-unsafe-negation */
/*eslint no-unsafe-negation: "error"*/
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
