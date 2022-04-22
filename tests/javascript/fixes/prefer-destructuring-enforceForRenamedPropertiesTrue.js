/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /* eslint prefer-destructuring: ["error", {"object": true, "array": true}, {"enforceForRenamedProperties": true}] */

  var foo = object.bar;
}

function correct() {
  /* eslint prefer-destructuring: ["error", {"object": true, "array": true}, {"enforceForRenamedProperties": true}] */

  var { bar: foo } = object;

  class C {
    #x;
    foo() {
        const bar = this.#x; // private identifiers are not allowed in destructuring
    }
  }
}
