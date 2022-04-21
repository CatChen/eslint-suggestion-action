/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint no-extra-label: "error"*/

  A: while (a) {
    break A;
  }

  B: for (let i = 0; i < 10; ++i) {
    break B;
  }

  C: switch (a) {
    case 0:
        break C;
  }
}

function correct() {
  /*eslint no-extra-label: "error"*/

  while (a) {
    break;
  }

  for (let i = 0; i < 10; ++i) {
    break;
  }

  switch (a) {
    case 0:
        break;
  }

  A: {
    break A;
  }

  B: while (a) {
    while (b) {
        break B;
    }
  }

  C: switch (a) {
    case 0:
        while (b) {
            break C;
        }
        break;
  }
}
