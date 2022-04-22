/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/

  if (!!foo || bar) {
    //...
  }

  while (!!foo && bar) {
    //...
  }

  if ((!!foo || bar) && baz) {
    //...
  }

  foo && Boolean(bar) ? baz : bat

  var foo = new Boolean(!!bar || baz)
}

function correct() {
  /*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/

  if (foo || bar) {
    //...
  }

  while (foo && bar) {
    //...
  }

  if ((foo || bar) && baz) {
    //...
  }

  foo && bar ? baz : bat

  var foo = new Boolean(bar || baz)

  var foo = !!bar || baz;
}  
