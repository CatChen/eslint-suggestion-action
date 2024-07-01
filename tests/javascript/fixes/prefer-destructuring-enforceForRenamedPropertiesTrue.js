/* eslint-disable */
/* eslint-enable prefer-destructuring */
/* eslint prefer-destructuring: ["error", {"object": true, "array": true}, {"enforceForRenamedProperties": true}] */
function incorrect() {
  var foo = object.bar;
}

function correct() {
  var { bar: foo } = object;

  class C {
    #x;
    foo() {
        const bar = this.#x; // private identifiers are not allowed in destructuring
    }
  }
}
