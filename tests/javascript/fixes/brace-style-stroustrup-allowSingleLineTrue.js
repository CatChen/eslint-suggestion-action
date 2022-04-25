/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint brace-style: ["error", "stroustrup", { "allowSingleLine": true }]*/

  function nop() { return; }

  if (foo) { bar(); }

  if (foo) { bar(); }
  else { baz(); }

  try { somethingRisky(); }
  catch(e) { handleError(); }

  class C {
    static { foo(); }
  }

  class D { static { foo(); } }
}
