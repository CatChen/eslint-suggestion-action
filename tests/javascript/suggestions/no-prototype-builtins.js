/* eslint-disable */
/* eslint-enable no-prototype-builtins */
/*eslint no-prototype-builtins: "error"*/
function incorrect() {
  var hasBarProperty = foo.hasOwnProperty("bar");

  var isPrototypeOfBar = foo.isPrototypeOf(bar);
  
  var barIsEnumerable = foo.propertyIsEnumerable("bar");
}

function correct() {
  var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

  var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);
  
  var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
}
