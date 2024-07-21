/* eslint-disable */
/* eslint-enable no-else-return */
/*eslint no-else-return: "error"*/
function foo() {
  if (x) {
    return y;
  }

  return z;
}

function foo() {
  if (x) {
    return y;
  } else if (z) {
    var t = "foo";
  } else {
    return w;
  }
}

function foo() {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}

function foo() {
  if (error) {
    return 'It failed';
  } else if (loading) {
    return "It's still loading";
  }
}
