/* eslint-disable */
/* eslint-enable comma-dangle */
/*eslint comma-dangle: ["error", "always-multiline"]*/
function incorrect() {
  var foo = {
    bar: "baz",
    qux: "quux"
  };

  var foo = { bar: "baz", qux: "quux", };

  var arr = [1,2,];

  var arr = [1,
    2,];

  var arr = [
    1,
    2
  ];

  foo({
  bar: "baz",
  qux: "quux"
  });
}

function correct() {

  var foo = {
    bar: "baz",
    qux: "quux",
  };

  var foo = {bar: "baz", qux: "quux"};
  var arr = [1,2];

  var arr = [1,
    2];

  var arr = [
    1,
    2,
  ];

  foo({
  bar: "baz",
  qux: "quux",
  });
}
