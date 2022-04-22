/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /* eslint capitalized-comments: ["error"], @typescript-eslint/no-unused-vars: off, no-redeclare: off */

  // lowercase comment
}

function correct() {
  // Capitalized comment

  // 1. Non-letter at beginning of comment

  // 丈 Non-Latin character at beginning of comment

  /* eslint semi:off */
  /* eslint-env node */
  /* eslint-disable */
  /* eslint-enable */
  /* istanbul ignore next */
  /* jscs:enable */
  /* jshint asi:true */
  /* global foo */
  /* globals foo */
  /* exported myVar */
  // eslint-disable-line
  // eslint-disable-next-line
  // https://github.com
}
