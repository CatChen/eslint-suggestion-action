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

function multi() {
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
}

function multiLine() {
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
}

function multiOrNest() {
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
}

function consistent() {
  function incorrect() {
    /*eslint curly: ["error", "multi", "consistent"]*/

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
    /*eslint curly: ["error", "multi", "consistent"]*/

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
}
