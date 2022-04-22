/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint prefer-object-has-own: "error"*/

  Object.prototype.hasOwnProperty.call(obj, "a");

  Object.hasOwnProperty.call(obj, "a");

  ({}).hasOwnProperty.call(obj, "a");

  const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
}

function correct() {
  /*eslint prefer-object-has-own: "error"*/

  Object.hasOwn(obj, "a");

  const hasProperty = Object.hasOwn(object, property);
}
