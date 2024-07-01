/* eslint-disable */
/* eslint-enable yoda */
/*eslint yoda: "error"*/
function incorrect() {
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