/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-else-return: ["error", {allowElseIf: false}]*/

  function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
  }
}

function correct() {
  /*eslint no-else-return: ["error", {allowElseIf: false}]*/

  function foo() {
    if (error) {
        return 'It failed';
    }

    if (loading) {
        return "It's still loading";
    }
  }
}
