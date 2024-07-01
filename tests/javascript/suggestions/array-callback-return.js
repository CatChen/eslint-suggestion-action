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
