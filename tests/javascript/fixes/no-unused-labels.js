/* eslint-disable */
/* eslint-enable no-unused-labels */
/*eslint no-unused-labels: "error"*/
  function incorrect() {
  A: var foo = 0;

  B: {
      foo();
  }

  C:
  for (let i = 0; i < 10; ++i) {
      foo();
  }
}

function correct() {
  A: {
    if (foo()) {
        break A;
    }
    bar();
  }

  B:
  for (let i = 0; i < 10; ++i) {
    if (foo()) {
        break B;
    }
    bar();
  }
}
