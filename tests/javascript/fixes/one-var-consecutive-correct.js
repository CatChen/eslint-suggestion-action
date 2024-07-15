/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "consecutive"]*/
function foo1() {
  var bar,
      baz;
}

function foo2(){
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
