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
