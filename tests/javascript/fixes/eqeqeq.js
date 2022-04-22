/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function incorrect() {
  /*eslint eqeqeq: "error"*/

  if (x == 42) { }

  if ("" == text) { }

  if (obj.getStuff() != undefined) { }

  /*eslint eqeqeq: ["error", "always"]*/

  a == b
  foo == true
  bananas != 1
  value == undefined
  typeof foo == 'undefined'
  'hello' != 'world'
  0 == 0
  true == true
  foo == null

}

function correct() {
  /*eslint eqeqeq: ["error", "always"]*/

  a === b
  foo === true
  bananas !== 1
  value === undefined
  typeof foo === 'undefined'
  'hello' !== 'world'
  0 === 0
  true === true
  foo === null
}
