/* eslint-disable */
/* eslint-enable block-style */
function incorrect() {
  /*eslint brace-style: "error"*/

  function foo()
  {
    return true;
  }

  if (foo)
  {
    bar();
  }

  try
  {
    somethingRisky();
  } catch(e)
  {
    handleError();
  }

  if (foo) {
    bar();
  }
  else {
    baz();
  }

  class C
  {
    static
    {
      foo();
    }
  }
}

function correct() {
  /*eslint brace-style: "error"*/

  function foo() {
    return true;
  }

  if (foo) {
    bar();
  }

  if (foo) {
    bar();
  } else {
    baz();
  }

  try {
    somethingRisky();
  } catch(e) {
    handleError();
  }

  class C {
    static {
      foo();
    }
  }

  // when there are no braces, there are no problems
  if (foo) bar();
  else if (baz) boom();
}
