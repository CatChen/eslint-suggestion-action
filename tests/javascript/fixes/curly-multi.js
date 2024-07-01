/* eslint-disable */
/* eslint-enable curly */
/*eslint curly: ["error", "multi"]*/
function incorrect() {
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
  if (foo) foo++;

  else foo();

  while (true) {
      doSomething();
      doSomethingElse();
  }
}
