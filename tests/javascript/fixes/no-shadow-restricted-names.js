/* eslint-disable */
/* eslint-enable no-shadow-restricted-names */
/*eslint no-shadow-restricted-names: "error"*/
function incorrect() {
  function NaN(){}

  !function(Infinity){};
  
  var undefined = 5;
  
  try {} catch(eval){}
}

function correct() {
  var Object;

  function f(a, b){}
  
  // Exception: `undefined` may be shadowed if the variable is never assigned a value.
  var undefined;
}
