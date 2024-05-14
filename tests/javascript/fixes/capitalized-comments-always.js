/* eslint-disable */
/* eslint-enable capitalized-comments */
/* eslint capitalized-comments: ["error", "always"] */
function incorrect() {
  // lowercase comment
}

function correct() {
  // Capitalized comment

  // 1. Non-letter at beginning of comment

  // 丈 Non-Latin character at beginning of comment

  /* eslint semi:off */
  /* eslint-env node */
  /* eslint-enable */
  // eslint-disable-line
  // eslint-disable-next-line
  /* eslint-disable */
  /* istanbul ignore next */
  /* jscs:enable */
  /* jshint asi:true */
  /* global foo */
  /* globals foo */
  /* exported myVar */
  // https://github.com
}
