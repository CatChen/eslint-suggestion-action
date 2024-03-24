/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-unreachable, no-constant-condition */
function incorrect() {
  /*eslint curly: ["error", "multi-or-nest"]*/

  if (!foo)
  foo = {
    bar: baz,
    qux: foo
  };

  while (true)
  if(foo)
    doSomething();
  else
    doSomethingElse();

  if (foo) {
  foo++;
  }

  while (true) {
  doSomething();
  }

  for (var i = 0; foo; i++) {
  doSomething();
  }
}

function correct() {
  /*eslint curly: ["error", "multi-or-nest"]*/

  if (!foo) {
    foo = {
      bar: baz,
      qux: foo
    };
  }

  while (true) {
  if(foo)
      doSomething();
  else
      doSomethingElse();
  }

  if (foo)
    foo++;

  while (true)
    doSomething();

  for (var i = 0; foo; i++)
    doSomething();
}
