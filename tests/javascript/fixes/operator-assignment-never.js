/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function never() {
  function incorrect() {
    /*eslint operator-assignment: ["error", "never"]*/

    x *= y;
    x ^= (y + z) / foo();
  }

  function correct() {
    /*eslint operator-assignment: ["error", "never"]*/

    x = x + y;
    x.y = x.y / a.b;
  }
}
