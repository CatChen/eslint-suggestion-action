/* eslint-disable */
/* eslint-enable curly */
/*eslint curly: "error"*/
function incorrect() {
  if (foo) foo++;

  while (bar)
    baz();

  if (foo) {
    baz();
  } else qux();
}

function correct() {
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
