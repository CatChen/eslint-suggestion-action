/* eslint-disable */
/* eslint-enable block-style */
function correct() {
  /*eslint brace-style: ["error", "1tbs", { "allowSingleLine": true }]*/

  function nop() { return; }

  if (foo) { bar(); }

  if (foo) { bar(); } else { baz(); }

  try { somethingRisky(); } catch(e) { handleError(); }

  if (foo) { baz(); } else {
    boom();
  }

  if (foo) { baz(); } else if (bar) {
    boom();
  }

  if (foo) { baz(); } else
  if (bar) {
    boom();
  }

  if (foo) { baz(); } else if (bar) {
    boom();
  }

  try { somethingRisky(); } catch(e) {
    handleError();
  }

  class C {
    static { foo(); }
  }

  class D { static { foo(); } }
}
