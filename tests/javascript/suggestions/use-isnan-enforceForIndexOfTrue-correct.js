/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/
function myIsNaN(val) {
  return typeof val === "number" && isNaN(val);
}

function indexOfNaN(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (myIsNaN(arr[i])) {
      return i;
    }
  }
  return -1;
}

function lastIndexOfNaN(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (myIsNaN(arr[i])) {
      return i;
    }
  }
  return -1;
}
  
var hasNaN = myArray.some(myIsNaN);

var hasNaN = indexOfNaN(myArray) >= 0;

var firstIndex = indexOfNaN(myArray);

var lastIndex = lastIndexOfNaN(myArray);

// ES2015
var hasNaN = myArray.some(Number.isNaN);

// ES2015
var firstIndex = myArray.findIndex(Number.isNaN);

// ES2016
var hasNaN = myArray.includes(NaN);
