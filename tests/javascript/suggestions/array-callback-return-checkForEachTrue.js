/* eslint-disable */
/* eslint-enable array-callback-return */
/*eslint array-callback-return: ["error", { checkForEach: true }]*/
function incorrect() {
  myArray.forEach(function(item) {
      return handleItem(item);
  });

  myArray.forEach(function(item) {
      if (item < 0) {
          return x;
      }
      handleItem(item);
  });

  myArray.forEach(function(item) {
      if (item < 0) {
          return void x;
      }
      handleItem(item);
  });

  myArray.forEach(item => handleItem(item));

  myArray.forEach(item => void handleItem(item));

  myArray.forEach(item => {
      return handleItem(item);
  });

  myArray.forEach(item => {
      return void handleItem(item);
  });
}

function correct() {
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
}
