/*eslint-disable @typescript-eslint/no-unused-vars*/
/*eslint spaced-comment: ["error", "never", { "markers": ["!<"], "block": { "markers": ["!", "!<"], "balanced": true } }]*/
function incorrect() {
  /*!This is a comment with a marker but with whitespace at the end */
}

function correct() {
  //!<This is a line comment with a marker

  /*!<this is a block comment with a marker
  subsequent lines are ignored*/
}
