/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "consecutive"]*/
function foo1() {
  var bar;
  var baz;
}

function foo2(){
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
