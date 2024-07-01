/* eslint-disable */
/* eslint-enable prefer-exponentiation-operator */
/*eslint prefer-exponentiation-operator: "error"*/
function incorrect() {
  const foo = Math.pow(2, 8);

  const bar = Math.pow(a, b);

  let baz = Math.pow(a + b, c + d);

  let quux = Math.pow(-1, n);
}

function correct() {
  const foo = 2 ** 8;

  const bar = a ** b;

  let baz = (a + b) ** (c + d);

  let quux = (-1) ** n;
}
