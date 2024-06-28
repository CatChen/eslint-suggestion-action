/* eslint-disable */
/* eslint-enable eqeqeq */
/*eslint eqeqeq: "error"*/
function incorrect() {
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
