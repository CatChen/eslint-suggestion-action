/* eslint-disable */
/* eslint-enable spaced-comment */
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-", "+", "*", "-+"], "block": { "exceptions": ["-", "*", "-+"] }, "line": { "exceptions": ["-+", "-"] } }] */
function incorrect() {
  //--------------
  // Comment block
  //--------------

  //------++++++++
  // Comment block
  //------++++++++

  /*------++++++++*/
  /* Comment block */
  /*------++++++++*/

  /*-+-+-+-+-+-+-+*/
  // Comment block
  /*-+-+-+-+-+-+-+*/

  /******** COMMENT *******/
}

function correct() {
  //--------------
  // Comment block
  //--------------

  //--------------
  // Comment block
  //--------------

  /****************
   * Comment block
   ****************/

  //-+-+-+-+-+-+-+
  // Comment block
  //-+-+-+-+-+-+-+

  /*-+-+-+-+-+-+-+*/
  // Comment block
  /*-+-+-+-+-+-+-+*/

  /*-+-+-+-+-+-+-+*/
  // Comment block
  /*-+-+-+-+-+-+-+*/

  /***************/

  /********
  COMMENT
  *******/
}
