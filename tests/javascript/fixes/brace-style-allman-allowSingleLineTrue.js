/* eslint-disable */
/* eslint-enable block-style */
function correct() {
  /*eslint brace-style: ["error", "allman", { "allowSingleLine": true }]*/

  function nop() { return; }

  if (foo) { bar(); }

  if (foo) { bar(); }
  else { baz(); }

  try { somethingRisky(); }
  catch(e) { handleError(); }

  class C
  {
    static { foo(); }

    static
    { foo(); }
  }

  class D { static { foo(); } }
}
