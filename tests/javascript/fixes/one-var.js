/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint one-var: ["error", "always"]*/

  function foo() {
    var bar;
    var baz;
    let qux;
    let norf;
  }

  function foo(){
    const bar = false;
    const baz = true;
    let qux;
    let norf;
  }

  function foo() {
    var bar;

    if (baz) {
        var qux = true;
    }
  }

  class C {
    static {
        var foo;
        var bar;
    }

    static {
        var foo;
        if (bar) {
            var baz = true;
        }
    }

    static {
        let foo;
        let bar;
    }
  }
}

function correct() {
  /*eslint one-var: ["error", "always"]*/

  function foo() {
    var bar,
        baz;
    let qux,
        norf;
  }

  function foo(){
    const bar = true,
        baz = false;
    let qux,
        norf;
  }

  function foo() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
  }

  function foo(){
    let bar;

    if (baz) {
        let qux;
    }
  }

  class C {
    static {
        var foo, bar;
    }

    static {
        var foo, baz;
        if (bar) {
            baz = true;
        }
    }

    static {
        let foo, bar;
    }

    static {
        let foo;
        if (bar) {
            let baz;
        }
    }
  }
}
