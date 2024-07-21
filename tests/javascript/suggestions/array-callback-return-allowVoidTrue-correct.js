/* eslint-disable */
/* eslint-enable array-callback-return */
/*eslint array-callback-return: ["error", { allowVoid: true }]*/
myArray.forEach(item => void handleItem(item));

myArray.forEach(item => {
  return void handleItem(item);
});

myArray.forEach(item => {
  if (item < 0) {
    return void x;
  }
  handleItem(item);
});
