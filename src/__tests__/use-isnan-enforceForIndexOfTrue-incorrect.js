/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/
var hasNaN = myArray.indexOf(NaN) >= 0;

var firstIndex = myArray.indexOf(NaN);

var lastIndex = myArray.lastIndexOf(NaN);

var indexWithSequenceExpression = myArray.indexOf((doStuff(), NaN));

var firstIndexFromSecondElement = myArray.indexOf(NaN, 1);

var lastIndexFromSecondElement = myArray.lastIndexOf(NaN, 1);
