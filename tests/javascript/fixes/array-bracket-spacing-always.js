/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint array-bracket-spacing: ["error", "always"]*/
  /*eslint-env es6*/

  var arr = ['foo', 'bar'];
  var arr = ['foo', 'bar' ];
  var arr = [ ['foo'], 'bar' ];
  var arr = ['foo',
    'bar'
  ];
  var arr = [
    'foo',
    'bar'];

  var [x, y] = z;
  var [x,y] = z;
  var [x, ...y] = z;
  var [,,x,] = z;
}

function correct() {
  /*eslint array-bracket-spacing: ["error", "always"]*/
  /*eslint-env es6*/

  var arr = [];
  var arr = [ 'foo', 'bar', 'baz' ];
  var arr = [ [ 'foo' ], 'bar', 'baz' ];
  var arr = [ 'foo',
    'bar'
  ];
  var arr = [
    'foo',
    'bar' ];
  var arr = [
    'foo',
    'bar',
    'baz'
  ];

  var [ x, y ] = z;
  var [ x,y ] = z;
  var [ x, ...y ] = z;
  var [ ,,x, ] = z;
}
