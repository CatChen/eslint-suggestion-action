/* eslint-disable */
/* eslint-enable no-extra-boolean-cast */
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
