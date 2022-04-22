/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-unreachable, no-constant-condition */
function incorrect() {
  /*eslint curly: "error"*/

  if (foo) foo++;

  while (bar)
    baz();

  if (foo) {
    baz();
  } else qux();
}

function correct() {
  /*eslint curly: "error"*/

  if (foo) {
    foo++;
  }

  while (bar) {
    baz();
  }

  if (foo) {
    baz();
  } else {
    qux();
  }
}
