/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint no-lonely-if: "error"*/

  if (condition) {
    // ...
  } else {
    if (anotherCondition) {
        // ...
    }
  }

  if (condition) {
    // ...
  } else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
  }
}

function correct() {
  /*eslint no-lonely-if: "error"*/

  if (condition) {
    // ...
  } else if (anotherCondition) {
    // ...
  }

  if (condition) {
    // ...
  } else if (anotherCondition) {
    // ...
  } else {
    // ...
  }

  if (condition) {
    // ...
  } else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
  }
}
