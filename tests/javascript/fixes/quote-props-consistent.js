/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint quote-props: ["error", "consistent"]*/

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
  /*eslint quote-props: ["error", "consistent"]*/

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
