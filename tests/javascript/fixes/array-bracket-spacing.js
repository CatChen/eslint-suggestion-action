/* eslint-disable */
/* eslint-enable array-bracket-spacing */
/*eslint array-bracket-spacing: ["error", "never"]*/
function incorrect() {
  /*eslint-env es6*/

  var arr = [ 'foo', 'bar' ];
  var arr = ['foo', 'bar' ];
  var arr = [ ['foo'], 'bar'];
  var arr = [[ 'foo' ], 'bar'];
  var arr = [ 'foo',
    'bar'
  ];
  var [ x, y ] = z;
  var [ x,y ] = z;
  var [ x, ...y ] = z;
  var [ ,,x, ] = z;
}

function correct() {
  /*eslint-env es6*/

  var arr = [];
  var arr = ['foo', 'bar', 'baz'];
  var arr = [['foo'], 'bar', 'baz'];
  var arr = [
    'foo',
    'bar',
    'baz'
  ];
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
