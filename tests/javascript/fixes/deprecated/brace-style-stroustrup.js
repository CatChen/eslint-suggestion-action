/* eslint-disable */
/* eslint-enable block-style */
function incorrect() {
  /*eslint brace-style: ["error", "stroustrup"]*/

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

  class C
  {
    static
    {
      foo();
    }
  }

  if (foo) {
    bar();
  } else {
    baz();
  }
}

function correct() {
  /*eslint brace-style: ["error", "stroustrup"]*/

  function foo() {
    return true;
  }

  if (foo) {
    bar();
  }

  if (foo) {
    bar();
  }
  else {
    baz();
  }

  try {
    somethingRisky();
  }
  catch(e) {
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
