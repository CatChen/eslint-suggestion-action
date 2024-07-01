/* eslint-disable */
/* eslint-enable array-bracket-spacing */
function incorrect() {
  /*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

  var arr = [ [ 1, 2 ], 2, 3, 4 ];
  var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];
}

function correct() {
  /*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

  var arr = [[ 1, 2 ], 2, 3, 4 ];
  var arr = [[ 1, 2 ], 2, [ 3, 4 ]];
}
