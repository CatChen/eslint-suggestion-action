/* eslint-disable */
/* eslint-enable no-useless-computed-key */
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/
class SomeClass {
  ["foo"] = "bar";
  [42] = "baz";

  ['a']() {}
  get ['b']() {}
  set ['c'](value) {}

  static ["foo"] = "bar";
  static ['baz']() {}
}
