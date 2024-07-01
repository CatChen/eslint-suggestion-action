/* eslint-disable */
/* eslint-enable no-extra-boolean */
/*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/
function incorrect() {
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
