/* eslint-disable */
/* eslint-enable no-else-return */
/*eslint no-else-return: ["error", {allowElseIf: false}]*/
function foo() {
  if (error) {
    return 'It failed';
  } else if (loading) {
    return "It's still loading";
  }
}
