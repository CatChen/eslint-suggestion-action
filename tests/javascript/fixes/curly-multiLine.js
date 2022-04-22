/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-unreachable, no-constant-condition */
function incorrect() {
  /*eslint curly: ["error", "multi-line"]*/

  if (foo)
    doSomething();
  else
    doSomethingElse();

  if (foo) foo(
    bar,
    baz);
}

function correct() {
  /*eslint curly: ["error", "multi-line"]*/

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
