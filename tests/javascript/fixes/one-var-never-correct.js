/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", "never"]*/
function foo1() {
  var bar;
  var baz;
}

function foo2() {
  var bar;

  if (baz) {
      var qux = true;
  }
}

function foo3() {
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
