/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint yoda: "error"*/

  if ("red" === color) {
    // ...
  }

  if (`red` === color) {
    // ...
  }

  if (`red` === `${color}`) {
    // ...
  }

  if (true == flag) {
    // ...
  }

  if (5 > count) {
    // ...
  }

  if (-1 < str.indexOf(substr)) {
    // ...
  }

  if (0 <= x && x < 1) {
    // ...
  }
}

function correct() {
  /*eslint yoda: "error"*/

  if (5 & value) {
    // ...
  }

  if (value === "red") {
    // ...
  }

  if (value === `red`) {
    // ...
  }

  if (`${value}` === `red`) {

  }
}