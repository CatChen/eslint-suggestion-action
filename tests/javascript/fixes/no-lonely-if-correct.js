/* eslint-disable */
/* eslint-enable no-lonely-if */
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
