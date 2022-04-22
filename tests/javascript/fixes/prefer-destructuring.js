/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /* eslint prefer-destructuring: ["error"] */

  // With `array` enabled
  var foo = array[0];

  // With `object` enabled
  var foo = object.foo;
  var foo = object['foo'];
}

function correct() {
  /* eslint prefer-destructuring: ["error"] */

  // With `array` enabled
  var [ foo ] = array;
  var foo = array[someIndex];

  // With `object` enabled
  var { foo } = object;

  var foo = object.bar;

  let foo;
  ({ foo } = object);
}
