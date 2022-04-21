/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-unreachable, no-constant-condition */
function incorrect() {
  /*eslint curly: ["error", "multi"]*/

  if (foo) {
    foo++;
  }

  if (foo) bar();
  else {
    foo++;
  }

  while (true) {
    doSomething();
  }

  for (var i=0; i < items.length; i++) {
    doSomething();
  }
}

function correct() {
  /*eslint curly: ["error", "multi"]*/

  if (foo) foo++;

  else foo();

  while (true) {
      doSomething();
      doSomethingElse();
  }
}
