/* eslint-disable */
/* eslint-enable prefer-object-has-own */
/*eslint prefer-object-has-own: "error"*/
function incorrect() {  
  Object.prototype.hasOwnProperty.call(obj, "a");

  Object.hasOwnProperty.call(obj, "a");

  ({}).hasOwnProperty.call(obj, "a");

  const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
}

function correct() {
  Object.hasOwn(obj, "a");

  const hasProperty = Object.hasOwn(object, property);
}
