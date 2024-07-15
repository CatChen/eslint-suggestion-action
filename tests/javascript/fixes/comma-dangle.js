/* eslint-disable */
/* eslint-enable comma-dangle */
/*eslint comma-dangle: ["error", "never"]*/
function incorrect() {
  var foo = {
    bar: "baz",
    qux: "quux",
  };

  var arr = [1,2,];

  foo({
  bar: "baz",
  qux: "quux",
  });
}

function correct() {

  var foo = {
    bar: "baz",
    qux: "quux"
  };

  var arr = [1,2];

  foo({
  bar: "baz",
  qux: "quux"
  });
}
