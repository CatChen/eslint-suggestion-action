/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint spaced-comment: ["error", "always", { "markers": ["/", "!<", "global"] }] */
function incorrect() {
  ///This is a comment with a marker but without whitespace

  /*! This is a comment with a marker but without whitespace at the end*/
}

function correct() {
  /// This is a comment with a marker

  /*global ABC*/
}
