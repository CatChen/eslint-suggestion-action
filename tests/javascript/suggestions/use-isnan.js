/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: "error"*/
function incorrect() {
  if (foo == NaN) {
      // ...
  }

  if (foo != NaN) {
      // ...
  }

  if (foo == Number.NaN) {
      // ...
  }

  if (foo != Number.NaN) {
      // ...
  }
}

function correct() {
  if (isNaN(foo)) {
      // ...
  }

  if (!isNaN(foo)) {
      // ...
  }
}
