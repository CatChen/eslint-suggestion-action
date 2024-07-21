/* eslint-disable */
/* eslint-enable no-useless-return */
/* eslint no-useless-return: "error" */
var foo = function() { return 5; }

var foo = function() {
  return doSomething();
}

var foo = function() {
  if (condition) {
    bar();
    return;
  } else {
    baz();
  }
  qux();
}

var foo = function() {
  switch (bar) {
    case 1:
      doSomething();
      return;
    default:
      doSomethingElse();
  }
}

var foo = function() {
  for (const foo of bar) {
    return;
  }
}
