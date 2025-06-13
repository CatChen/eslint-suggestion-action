/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "never"]*/
function foo1() {
  var bar,
      baz;
  const qux = true,
      foobar = false;
}

function foo2() {
  var bar,
      qux;

  if (baz) {
      qux = true;
  }
}

function foo3(){
  let bar = true,
      baz = false;
}

class C {
  static {
      var foo, bar;
      let baz, qux;
  }
}
