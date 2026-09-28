/* eslint-disable */
/* eslint-enable prefer-object-has-own */
/*eslint prefer-object-has-own: "error"*/
Object.prototype.hasOwnProperty.call(obj, "a");

Object.hasOwnProperty.call(obj, "a");

({}).hasOwnProperty.call(obj, "a");

const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
