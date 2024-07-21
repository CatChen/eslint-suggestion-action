/* eslint-disable */
/* eslint-enable no-prototype-builtins */
/*eslint no-prototype-builtins: "error"*/
var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
