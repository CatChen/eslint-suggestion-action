/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "always"]*/
function incorrect() {
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

/*eslint one-var: ["error", "never"]*/
function incorrect() {
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

/*eslint one-var: ["error", "consecutive"]*/
function incorrect() {
  function foo() {
    var bar;
    var baz;
  }

  function foo(){
    var bar = 1;
    var baz = 2;

    qux();

    var qux = 3;
    var quux;
  }

  class C {
    static {
      var foo;
      var bar;
      let baz;
      let qux;
    }
  }
}

function correct() {
  function foo() {
    var bar,
      baz;
  }

  function foo(){
    var bar = 1,
      baz = 2;

    qux();

    var qux = 3,
      quux;
  }

  class C {
    static {
      var foo, bar;
      let baz, qux;
      doSomething();
      let quux;
      var quuux;
    }
  }
}

/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var bar;
    var baz;
    let qux,
      norf;
  }

  function foo() {
    const bar = 1,
        baz = 2;
    let qux,
      norf;
  }
}

function correct() {
  /*eslint-env es6*/

  function foo() {
    var bar,
      baz;
    let qux;
    let norf;
  }

  function foo() {
    const bar = 1;
    const baz = 2;
    let qux;
    let norf;
  }
}

/*eslint one-var: ["error", { var: "never" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var bar,
      baz;
  }
}

function correct() {
  /*eslint-env es6*/

  function foo() {
    var bar;
    var baz;

    // `const` and `let` declarations are ignored if they are not specified
    const foobar = 1;
    const foobaz = 2;
    const barfoo = 1, bazfoo = 2;
    let qux;
    let norf;
    let fooqux, foonorf;
  } 
}

/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/
function incorrect() {
  /*eslint-env node*/

  var foo = require("foo"),
      bar = "bar";
}

function correct() {
  /*eslint-env node*/

  () => {
    var foo = require("foo");
    var bar = "bar";
  }

  () => {
    var foo = require("foo"),
      bar = require("bar");
  }
}

/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    let a,
      b;
    let c;

    var d,
      e;
  }

  function foo() {
    const a = 1,
      b = 2;
    const c = 3;

    var d,
      e;
  }
}

function correct() {
  /*eslint-env es6*/

  function foo() {
    let a,
      b;

    var d;
    var e;

    let f;
  }

  function foo() {
    const a = 1,
      b = 2;

    var c;
    var d;

    const e = 3;
  }
}

/*eslint one-var: ["error", { var: "consecutive" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var a;
    var b;
  }
}

function correct() {
  /*eslint-env es6*/

  function foo() {
    var a,
      b;
    const c = 1; // `const` and `let` declarations are ignored if they are not specified
    const d = 2;
    let e;
    let f;
  }
}

/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/
function incorrect() {
    /*eslint-env es6*/

  function foo() {
    var a, b, c;
    var foo = true;
    var bar = false;
  }
}

function correct() {
  function foo() {
    var a;
    var b;
    var c;
    var foo = true,
      bar = false;
  }

  for (let z of foo) {
    doSomething(z);
  }

  let z;
  for (z of foo) {
    doSomething(z);
  }
}

/*eslint one-var: ["error", { "initialized": "never" }]*/
function incorrect() {
  /*eslint-env es6*/

  function foo() {
    var foo = true,
      bar = false;
  }
}

function correct() {
  function foo() {
    var foo = true;
    var bar = false;
    var a, b, c; // Uninitialized variables are ignored
  }
}

/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/
function incorrect() {
  function foo() {
    var a = 1;
    var b = 2;
    var c,
      d;
    var e = 3;
    var f
  }
}

function correct() {
  function foo() {
    var a = 1,
      b = 2;
    var c;
    var d;
    var e = 3,
      f = 4;
  }
}

/*eslint one-var: ["error", { "initialized": "consecutive" }]*/
function incorrect() {
  function foo() {
    var a = 1;
    var b = 2;

    foo();

    var c = 3;
    var d = 4;
  }
}

function correct() {
  function foo() {
    var a = 1,
      b = 2;

    foo();

    var c = 3,
      d = 4;
  }
}
