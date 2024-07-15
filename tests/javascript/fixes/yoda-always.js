/* eslint-disable */
/* eslint-enable yoda */
/*eslint yoda: ["error", "always"]*/
function incorrect() {
  if (color == "blue") {
    // ...
  }

  if (color == `blue`) {
    // ...
  }
}

function correct() {
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
