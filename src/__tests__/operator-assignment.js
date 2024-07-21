/* eslint-disable */
/* eslint-enable operator-assignment */
/*eslint operator-assignment: ["error", "always"]*/
function incorrect() {
  x = x + y;
  x = y * x;
  x[0] = x[0] / y;
  x.y = x.y << z;
}

function correct() {
  x = y;
  x += y;
  x = y * z;
  x = (x * y) * z;
  x[0] /= y;
  x[foo()] = x[foo()] % 2;
  x = y + x; // `+` is not always commutative (e.g. x = "abc")
}

/*eslint operator-assignment: ["error", "never"]*/
function incorrect() {
  x *= y;
  x ^= (y + z) / foo();
}

function correct() {
  x = x + y;
  x.y = x.y / a.b;
}
