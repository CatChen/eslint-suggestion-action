/* eslint-disable */
/* eslint-enable require-unicode-regexp */
/*eslint require-unicode-regexp: "error"*/

function incorrect() {
  const a = /aaa/
  const b = /bbb/gi
  const c = new RegExp("ccc")
  const d = new RegExp("ddd", "gi")
}

function correct() {
  const a = /aaa/u
  const b = /bbb/giu
  const c = new RegExp("ccc", "u")
  const d = new RegExp("ddd", "giu")

  const e = /aaa/v
  const f = /bbb/giv
  const g = new RegExp("ccc", "v")
  const h = new RegExp("ddd", "giv")

  // This rule ignores RegExp calls if the flags could not be evaluated to a static value.
  function i(flags) {
      return new RegExp("eee", flags)
  }
}