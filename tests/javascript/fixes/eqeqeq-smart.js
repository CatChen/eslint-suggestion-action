/* eslint-disable */
/* eslint-enable eqeqeq */
/*eslint eqeqeq: ["error", "smart"]*/
function incorrect() {
  // comparing two variables requires ===
  a == b

  // only one side is a literal
  foo == true
  bananas != 1

  // comparing to undefined requires ===
  value == undefined
}

function correct() {
  typeof foo == 'undefined'
  'hello' != 'world'
  0 == 0
  true == true
  foo == null
}
