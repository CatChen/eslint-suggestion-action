/* eslint-disable */
/* eslint-enable no-lonely-if */
/*eslint no-lonely-if: "error"*/
function incorrect() {
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
