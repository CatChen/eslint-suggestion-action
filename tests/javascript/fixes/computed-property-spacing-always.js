/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint computed-property-spacing: ["error", "always"]*/
  /*eslint-env es6*/

  obj[foo]
  var x = {[b]: a}
  obj[ foo]
  obj['foo' ]
  obj[foo[ bar ]]
  var x = {[ b]: a}
  const { [a]: someProp } = obj;
  ({ [b ]: anotherProp } = anotherObj);
}

function correct() {
  /*eslint computed-property-spacing: ["error", "always"]*/
  /*eslint-env es6*/

  obj[ foo ]
  obj[ 'foo' ]
  var x = {[ b ]: a}
  obj[ foo[ bar ] ]
  const { [ a ]: someProp } = obj;
  ({ [ b ]: anotherProp } = anotherObj);
}
