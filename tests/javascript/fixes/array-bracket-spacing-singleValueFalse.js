/* eslint-disable */
/* eslint-enable array-bracket-spacing */
function incorrect() {
  /*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

  var foo = [ 'foo' ];
  var foo = [ 'foo'];
  var foo = ['foo' ];
  var foo = [ 1 ];
  var foo = [ 1];
  var foo = [1 ];
  var foo = [ [ 1, 2 ] ];
  var foo = [ { 'foo': 'bar' } ];
}

function correct() {
  /*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

  var foo = ['foo'];
  var foo = [1];
  var foo = [[ 1, 1 ]];
  var foo = [{ 'foo': 'bar' }];
}
