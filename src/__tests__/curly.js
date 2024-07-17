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

/*eslint curly: ["error", "multi-or-nest"]*/
function incorrect() {
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

/*eslint curly: ["error", "multi", "consistent"]*/
function incorrect() {
  if (foo) {
    bar();
    baz();
  } else
    buz();

  if (foo)
    bar();
  else if (faa)
    bor();
  else {
    other();
    things();
  }

  if (true)
    foo();
  else {
    baz();
  }

  if (foo) {
    foo++;
  }
}

function correct() {
  if (foo) {
    bar();
    baz();
  } else {
    buz();
  }

  if (foo) {
    bar();
  } else if (faa) {
    bor();
  } else {
    other();
    things();
  }

  if (true)
    foo();
  else
    baz();

  if (foo)
    foo++;

}
