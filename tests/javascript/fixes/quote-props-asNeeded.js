/* eslint-disable */
/* eslint-enable quote-props */
/*eslint quote-props: ["error", "as-needed"]*/
function incorrect() {
  var object = {
    "a": 0,
    "0": 0,
    "true": 0,
    "null": 0
  };
}

function correct() {
  /*eslint-env es6*/

  var object1 = {
    "a-b": 0,
    "0x0": 0,
    "1e2": 0
  };

  var object2 = {
    foo: 'bar',
    baz: 42,
    true: 0,
    0: 0,
    'qux-lorem': true
  };

  var object3 = {
    foo() {
        return;
    }
  };
}
