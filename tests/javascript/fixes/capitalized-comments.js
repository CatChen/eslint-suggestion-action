/* eslint-disable */
/* eslint-enable capitalized-comments */
/* eslint capitalized-comments: ["error"], @typescript-eslint/no-unused-vars: off, no-redeclare: off */
function incorrect() {
  // lowercase comment
}

function correct() {
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

/* eslint capitalized-comments: ["error", "never"] */
function incorrect() {
  // Capitalized comment
}

function correct() {
  // lowercase comment

  // 1. Non-letter at beginning of comment

  // 丈 Non-Latin character at beginning of comment
}

/* eslint capitalized-comments: ["error", "always", { "ignoreInlineComments": true }] */
function correct() {
  function foo(/* ignored */ a) {
  }
}

/* eslint capitalized-comments: ["error", "always", { "ignoreInlineComments": true }] */
function correct() {
  function foo(/* ignored */ a) {
  }
}

/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */
function correct() {
  // This comment is valid since it has the correct capitalization.
  // this comment is ignored since it follows another comment,
  // and this one as well because it follows yet another comment.

  /* Here is a block comment which has the correct capitalization, */
  /* but this one is ignored due to being consecutive; */
  /*
  * in fact, even if any of these are multi-line, that is fine too.
  */
}

function incorrect() {
  // this comment is invalid, but only on this line.
  // this comment does NOT get reported, since it is a consecutive comment.
}
