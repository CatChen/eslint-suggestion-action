/* eslint-disable */
/* eslint-enable no-useless-computed-key */
/*eslint no-useless-computed-key: "error"*/
var a = { ['0']: 0 };
var a = { ['0+1,234']: 0 };
var a = { [0]: 0 };
var a = { ['x']: 0 };
var a = { ['x']() {} };

class Foo {
  ["foo"] = "bar";

  [0]() {}
  ['a']() {}
  get ['b']() {}
  set ['c'](value) {}

  static ["foo"] = "bar";

  static ['a']() {}
}
