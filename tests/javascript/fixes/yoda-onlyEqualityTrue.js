/* eslint-disable */
/* eslint-enable yoda */
/*eslint yoda: ["error", "never", { "onlyEquality": true }]*/
function correct() {
  if (x < -1 || 9 < x) {
  }

  if (x !== 'foo' && 'bar' != x) {
  }

  if (x !== `foo` && `bar` != x) {
  }
}
