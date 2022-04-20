/* eslint-disable @typescript-eslint/no-unused-vars */
function incorrect() {
  /* eslint capitalized-comments: ["error"] */

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

function always() {
  function incorrect() {
    /* eslint capitalized-comments: ["error", "always"] */

    // lowercase comment
  }

  function correct() {
    /* eslint capitalized-comments: ["error", "always"] */

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
}

function never() {
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
}

function ignorePatternPragma() {
  function correct() {
    /* eslint capitalized-comments: ["error", "always", { "ignorePattern": "pragma" }] */

    function foo() {
      /* pragma wrap(true) */
    }
  }
}

function ignoreInlineCommentsTrue () {
  function correct() {
    /* eslint capitalized-comments: ["error", "always", { "ignoreInlineComments": true }] */

    function foo(/* ignored */ a) {
    }
  }
}

function ignoreConsecutiveComments() {
  function correct() {
    /* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

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
    /* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

    // this comment is invalid, but only on this line.
    // this comment does NOT get reported, since it is a consecutive comment.
  }
}