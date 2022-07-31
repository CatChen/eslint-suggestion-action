/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint yoda: ["error", "always"]*/

  if (color == "blue") {
    // ...
  }

  if (color == `blue`) {
    // ...
  }
}

function correct() {
  /*eslint yoda: ["error", "always"]*/

  if ("blue" == value) {
    // ...
  }

  if (`blue` == value) {
    // ...
  }

  if (`blue` == `${value}`) {
    // ...
  }

  if (-1 < str.indexOf(substr)) {
    // ...
  }
}
