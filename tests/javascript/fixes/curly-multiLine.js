/* eslint-disable */
/* eslint-enable curly */
/*eslint curly: ["error", "multi-line"]*/
function incorrect() {
  if (foo)
    doSomething();
  else
    doSomethingElse();

  if (foo) foo(
    bar,
    baz);
}

function correct() {
  if (foo) foo++; else doSomething();

  if (foo) foo++;
  else if (bar) baz()
  else doSomething();

  do something();
  while (foo);

  while (foo
    && bar) baz();

  if (foo) {
    foo++;
  }

  if (foo) { foo++; }

  while (true) {
    doSomething();
    doSomethingElse();
  }
}
