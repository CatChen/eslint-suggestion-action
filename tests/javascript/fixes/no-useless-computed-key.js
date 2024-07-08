/* eslint-disable */
/* eslint-enable no-useless-computed-key */
/*eslint no-useless-computed-key: "error"*/
function incorrect() {
  var a = { ['0']: 0 };
  var a = { ['0+1,234']: 0 };
  var a = { [0]: 0 };
  var a = { ['x']: 0 };
  var a = { ['x']() {} };
}

function correct() {
  var c = { 'a': 0 };
  var c = { 0: 0 };
  var a = { x() {} };
  var c = { a: 0 };
  var c = { '0+1,234': 0 };

  var c = {
    "__proto__": foo, // defines object's prototype

    ["__proto__"]: bar // defines a property named "__proto__"
  };
}
