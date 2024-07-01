/* eslint-disable */
/* eslint-enable quote-props */
/*eslint quote-props: ["error", "consistent"]*/
function incorrect() {
  var object1 = {
    foo: "bar",
    "baz": 42,
    "qux-lorem": true
  };

  var object2 = {
    'foo': 'bar',
    baz: 42
  };
}

function correct() {
  var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
  };

  var object2 = {
    'foo': 'bar',
    'baz': 42
  };

  var object3 = {
    foo: 'bar',
    baz: 42
  };
}
