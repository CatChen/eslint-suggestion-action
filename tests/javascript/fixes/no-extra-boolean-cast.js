/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-extra-boolean-cast: "error"*/

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
}

function correct() {
  /*eslint no-extra-boolean-cast: "error"*/

  var foo = !!bar;
  var foo = Boolean(bar);

  function foo() {
      return !!bar;
  }

  var foo = bar ? !!baz : !!bat;
}
