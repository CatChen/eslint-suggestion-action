/* eslint-disable */
/* eslint-enable arrow-spacing */
function incorrect() {
  /*eslint block-spacing: ["error", "never"]*/

  function foo() { return true; }
  if (foo) { bar = 0;}

  class C {
      static { this.bar = 0; }
  }
}

function correct() {
  /*eslint block-spacing: ["error", "never"]*/

  function foo() {return true;}
  if (foo) {bar = 0;}

  class C {
      static {this.bar = 0;}
  }
}
