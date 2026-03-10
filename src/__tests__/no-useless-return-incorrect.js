/* eslint-disable */
/* eslint-enable no-useless-return */
/* eslint no-useless-return: "error" */
var foo = function() { return; }

var foo = function() {
  doSomething();
  return;
}

var foo = function() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
}

var foo = function() {
  switch (bar) {
    case 1:
      doSomething();
    default:
      doSomethingElse();
      return;
  }
}
