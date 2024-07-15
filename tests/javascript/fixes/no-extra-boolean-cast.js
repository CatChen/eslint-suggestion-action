/* eslint-disable */
/* eslint-enable no-extra-boolean-cast */
/*eslint no-extra-boolean-cast: "error"*/
// Incorrect Code
var foo = !!!bar;

var foo = !!bar ? baz : bat;

var foo = Boolean(!!bar);

var foo = new Boolean(!!bar);

if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

while (!!foo) {
    // ...
}

do {
    // ...
} while (Boolean(foo));

for (; !!foo; ) {
    // ...
}


// Correct Code
var foo = !!bar;
var foo = Boolean(bar);

function foo() {
    return !!bar;
}

var foo = bar ? !!baz : !!bat;

/*eslint no-extra-boolean-cast: ["error", {"enforceForLogicalOperands": true}]*/
// Incorrect Code
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

// Correct Code
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
