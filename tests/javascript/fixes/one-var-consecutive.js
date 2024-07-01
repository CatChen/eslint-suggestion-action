/* eslint-disable */
/* eslint-enable one-var */
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
