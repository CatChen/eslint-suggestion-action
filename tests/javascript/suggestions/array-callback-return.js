/* eslint-disable */
/* eslint-enable array-callback-return */
/*eslint array-callback-return: "error"*/
function incorrect() {
  var indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
  }, {});

  var foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
  });

  var bar = foo.filter(function(x) {
    if (x) {
      return true;
    } else {
      return;
    }
  });
}

function correct() {
  var indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
    return memo;
  }, {});

  var foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
      return true;
    }
    return false;
  });

  var bar = foo.map(node => node.getAttribute("id"));
}

/*eslint array-callback-return: ["error", { allowImplicit: true }]*/
function correct() {
  var undefAllTheThings = myArray.map(function(item) {
    return;
  });
}

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

/*eslint array-callback-return: ["error", { allowVoid: true }]*/
function correct() {
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
}
