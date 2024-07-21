/* eslint-disable */
/* eslint-enable array-callback-return */
/*eslint array-callback-return: ["error", { checkForEach: true }]*/
myArray.forEach(function(item) {
  handleItem(item)
});

myArray.forEach(function(item) {
  if (item < 0) {
    return;
  }
  handleItem(item);
});

myArray.forEach(function(item) {
  handleItem(item);
  return;
});

myArray.forEach(item => {
    handleItem(item);
});
