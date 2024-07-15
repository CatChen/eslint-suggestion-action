/* eslint-disable */
/* eslint-enable no-extra-boolean-cast */
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
