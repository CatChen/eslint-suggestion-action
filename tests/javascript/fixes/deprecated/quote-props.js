/* eslint-disable */
/* eslint-enable quote-props */
/*eslint quote-props: ["error", "always"]*/
function incorrect() {
  var object = {
    foo: "bar",
    baz: 42
  };
}

function correct() {
  /*eslint-env es6*/

  var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
  };

  var object2 = {
    'foo': 'bar',
    'baz': 42,
    'qux-lorem': true
  };

  var object3 = {
    foo() {
        return;
    }
  };
}
