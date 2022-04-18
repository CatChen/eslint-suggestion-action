/* eslint-disable */
/* eslint-enable computed-property-spacing */
/*eslint computed-property-spacing: ["error", "always"]*/
function incorrect() {
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
  /*eslint-env es6*/

  obj[ foo ]
  obj[ 'foo' ]
  var x = {[ b ]: a}
  obj[ foo[ bar ] ]
  const { [ a ]: someProp } = obj;
  ({ [ b ]: anotherProp } = anotherObj);
}
