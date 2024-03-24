/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint comma-dangle: ["error", "never"]*/

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
  /*eslint comma-dangle: ["error", "never"]*/

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
