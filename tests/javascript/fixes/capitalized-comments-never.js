/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /* eslint capitalized-comments: ["error", "never"] */

  // Capitalized comment
}

function correct() {
  /* eslint capitalized-comments: ["error", "never"] */

  // lowercase comment

  // 1. Non-letter at beginning of comment

  // 丈 Non-Latin character at beginning of comment
}
