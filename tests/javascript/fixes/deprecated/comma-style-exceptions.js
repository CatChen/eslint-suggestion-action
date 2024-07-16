/* eslint-disable */
/* eslint-enable comma-style */
/*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/
function incorrect() {
  var o = {},
      a = [];
}

function correct() {
  var o = {fst:1,
    snd: [1,
          2]}
  , a = [];
}
