/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function correct() {
  /*eslint yoda: ["error", "never", { "onlyEquality": true }]*/

  if (x < -1 || 9 < x) {
  }

  if (x !== 'foo' && 'bar' != x) {
  }

  if (x !== `foo` && `bar` != x) {
  }
}
