/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

  var o = {},
      a = [];
}

function correct() {
  /*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

  var o = {fst:1,
    snd: [1,
          2]}
  , a = [];
}
