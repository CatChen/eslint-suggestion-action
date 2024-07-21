/* eslint-disable */
/* eslint-enable prefer-destructuring */
/* eslint prefer-destructuring: ["error"] */
// With `array` enabled
var [ foo ] = array;
var foo = array[someIndex];

// With `object` enabled
var { foo } = object;

var foo = object.bar;

let foo;
({ foo } = object);
