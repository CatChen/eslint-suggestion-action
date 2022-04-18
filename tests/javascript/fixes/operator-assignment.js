/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint operator-assignment: ["error", "always"]*/

  x = x + y;
  x = y * x;
  x[0] = x[0] / y;
  x.y = x.y << z;
}

function correct() {
  /*eslint operator-assignment: ["error", "always"]*/

  x = y;
  x += y;
  x = y * z;
  x = (x * y) * z;
  x[0] /= y;
  x[foo()] = x[foo()] % 2;
  x = y + x; // `+` is not always commutative (e.g. x = "abc")
}
