/* eslint-disable */
/* eslint-enable no-useless-computed-key */
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/
const obj = {
  ["foo"]: "bar",
  [42]: "baz",

  ['a']() {},
  get ['b']() {},
  set ['c'](value) {}
};
