/* eslint-disable */
/* eslint-enable operator-assignment */
/*eslint operator-assignment: ["error", "never"]*/
function incorrect() {
  x *= y;
  x ^= (y + z) / foo();
}

function correct() {
  x = x + y;
  x.y = x.y / a.b;
}
