/* eslint-disable */
/* eslint-enable no-useless-computed-key */
/*eslint no-useless-computed-key: "error"*/
var c = { 'a': 0 };
var c = { 0: 0 };
var a = { x() {} };
var c = { a: 0 };
var c = { '0+1,234': 0 };

class Foo {
  "foo" = "bar";

  0() {}
  'a'() {}
  get 'b'() {}
  set 'c'(value) {}

  static "foo" = "bar";

  static 'a'() {}
}

var c = {
  "__proto__": foo, // defines object's prototype

  ["__proto__"]: bar // defines a property named "__proto__"
};

class Foo {
  ["constructor"]; // instance field named "constructor"

  "constructor"() {} // the constructor of this class

  ["constructor"]() {} // method named "constructor"

  static ["constructor"]; // static field named "constructor"

  static ["prototype"]; // runtime error, it would be a parsing error without `[]`
}
