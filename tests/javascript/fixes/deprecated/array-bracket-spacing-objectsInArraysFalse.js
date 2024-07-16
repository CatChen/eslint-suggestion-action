/* eslint-disable */
/* eslint-enable array-bracket-spacing */
function incorrect() {
  /*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

  var arr = [ { 'foo': 'bar' } ];
  var arr = [ {
    'foo': 'bar'
  } ]
}

function correct() {
  /*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

  var arr = [{ 'foo': 'bar' }];
  var arr = [{
    'foo': 'bar'
  }];
}
