/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "always"]*/
function foo1() {
  var bar,
      baz;
  let qux,
      norf;
}

function foo2(){
  const bar = true,
      baz = false;
  let qux,
      norf;
}

function foo3() {
  var bar,
      qux;

  if (baz) {
      qux = true;
  }
}

function foo4(){
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
