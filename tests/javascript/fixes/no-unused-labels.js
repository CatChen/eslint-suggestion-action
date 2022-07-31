/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint no-unused-labels: "error"*/

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
  /*eslint no-unused-labels: "error"*/

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
