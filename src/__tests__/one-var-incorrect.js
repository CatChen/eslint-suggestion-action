/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "always"]*/
function foo1() {
  var bar;
  var baz;
  let qux;
  let norf;
}

function foo2(){
  const bar = false;
  const baz = true;
  let qux;
  let norf;
}

function foo3() {
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
