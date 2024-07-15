/* eslint-disable */
/* eslint-enable block-spacing */
function incorrect() {
  /*eslint block-spacing: "error"*/

  function foo() {return true;}
  if (foo) { bar = 0;}
  function baz() {let i = 0;
      return i;
  }

  class C {
      static {this.bar = 0;}
  }
}

function correct() {
  /*eslint block-spacing: "error"*/

  function foo() { return true; }
  if (foo) { bar = 0; }

  class C {
      static { this.bar = 0; }
  }
}
