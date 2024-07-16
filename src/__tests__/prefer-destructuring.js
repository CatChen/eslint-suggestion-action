/* eslint-disable */
/* eslint-enable prefer-destructuring */
/* eslint prefer-destructuring: ["error"] */
function incorrect() {
  // With `array` enabled
  var foo = array[0];

  // With `object` enabled
  var foo = object.foo;
  var foo = object['foo'];
}

function correct() {
  // With `array` enabled
  var [ foo ] = array;
  var foo = array[someIndex];

  // With `object` enabled
  var { foo } = object;

  var foo = object.bar;

  let foo;
  ({ foo } = object);
}

/* eslint prefer-destructuring: ["error", {"VariableDeclarator": {"object": true}}] */
function correct() {
  var {bar: foo} = object;
}

/* eslint prefer-destructuring: ["error", {"AssignmentExpression": {"array": true}}] */
function correct() {
  [bar] = array;
}

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
