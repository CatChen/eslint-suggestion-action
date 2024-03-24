/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", "never"]*/

  function foo() {
    var bar,
        baz;
    const bar = true,
        baz = false;
  }

  function foo() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
  }

  function foo(){
    let bar = true,
        baz = false;
  }

  class C {
    static {
        var foo, bar;
        let baz, qux;
    }
  }
}

function correct() {
  /*eslint one-var: ["error", "never"]*/

  function foo() {
    var bar;
    var baz;
  }

  function foo() {
    var bar;

    if (baz) {
        var qux = true;
    }
  }

  function foo() {
    let bar;

    if (baz) {
        let qux = true;
    }
  }

  class C {
    static {
        var foo;
        var bar;
        let baz;
        let qux;
    }
  }

  // declarations with multiple variables are allowed in for-loop initializers
  for (var i = 0, len = arr.length; i < len; i++) {
    doSomething(arr[i]);
  }
}
