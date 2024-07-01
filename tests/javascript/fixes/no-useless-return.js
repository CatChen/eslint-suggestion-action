/* eslint-disable */
/* eslint-enable no-useless-return */
/* eslint no-useless-return: "error" */
function incorrect() {

  function foo() { return; }

  function foo() {
    doSomething();
    return;
  }

  function foo() {
    if (condition) {
      bar();
      return;
    } else {
      baz();
    }
  }

  function foo() {
    switch (bar) {
      case 1:
        doSomething();
      default:
        doSomethingElse();
        return;
    }
  }
}

function correct() {
  function foo() { return 5; }

  function foo() {
    return doSomething();
  }

  function foo() {
    if (condition) {
      bar();
      return;
    } else {
      baz();
    }
    qux();
  }

  function foo() {
    switch (bar) {
      case 1:
        doSomething();
        return;
      default:
        doSomethingElse();
    }
  }

  function foo() {
    for (const foo of bar) {
      return;
    }
  }
}
