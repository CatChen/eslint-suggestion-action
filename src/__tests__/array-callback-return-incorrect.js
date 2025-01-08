/* eslint-disable */
/* eslint-enable array-callback-return */
/*eslint array-callback-return: "error"*/
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
