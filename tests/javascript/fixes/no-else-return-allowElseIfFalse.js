/* eslint-disable */
/* eslint-enable no-else-return */
/*eslint no-else-return: ["error", {allowElseIf: false}]*/
function incorrect() {
  function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
  }
}

function correct() {
  function foo() {
    if (error) {
        return 'It failed';
    }

    if (loading) {
        return "It's still loading";
    }
  }
}
