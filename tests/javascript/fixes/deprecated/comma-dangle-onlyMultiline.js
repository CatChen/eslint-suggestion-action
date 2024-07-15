/* eslint-disable */
/* eslint-enable comma-dangle */
/*eslint comma-dangle: ["error", "only-multiline"]*/
function incorrect() {
  var foo = { bar: "baz", qux: "quux", };

  var arr = [1,2,];

  var arr = [1,
    2,];
}

function correct() {

  var foo = {
    bar: "baz",
    qux: "quux",
  };

  var foo = {
    bar: "baz",
    qux: "quux"
  };

  var foo = {bar: "baz", qux: "quux"};
  var arr = [1,2];

  var arr = [1,
    2];

  var arr = [
    1,
    2,
  ];

  var arr = [
    1,
    2
  ];

  foo({
    bar: "baz",
    qux: "quux",
  });

  foo({
    bar: "baz",
    qux: "quux"
  });
}
