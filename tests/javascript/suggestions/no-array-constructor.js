/* eslint-disable */
/* eslint-enable no-array-constructor */
/*eslint no-array-constructor: "error"*/
function incorrect() {
  Array();

  Array(0, 1, 2);
  
  new Array(0, 1, 2);
  
  Array(...args);
}

function correct() {
  Array(500);

  new Array(someOtherArray.length);
  
  [0, 1, 2];
  
  const createArray = Array => new Array();
}
