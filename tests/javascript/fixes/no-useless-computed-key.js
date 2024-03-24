/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function, getter-return, no-dupe-keys, no-dupe-class-members */
function incorrect() {
  /*eslint no-useless-computed-key: "error"*/

  var a = { ['0']: 0 };
  var a = { ['0+1,234']: 0 };
  var a = { [0]: 0 };
  var a = { ['x']: 0 };
  var a = { ['x']() {} };
}

function correct() {
  /*eslint no-useless-computed-key: "error"*/

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
