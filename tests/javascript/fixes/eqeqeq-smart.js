/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint eqeqeq: ["error", "smart"]*/

  // comparing two variables requires ===
  a == b

  // only one side is a literal
  foo == true
  bananas != 1

  // comparing to undefined requires ===
  value == undefined
}

function correct() {
  /*eslint eqeqeq: ["error", "smart"]*/

  typeof foo == 'undefined'
  'hello' != 'world'
  0 == 0
  true == true
  foo == null
}
