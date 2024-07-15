/* eslint-disable */
/* eslint-enable object-shorthand */
/*eslint object-shorthand: "error"*/
// Incorrect Code
var foo = {
  w: function() {},
  x: function *() {},
  [y]: function() {},
  z: z
};
/* eslint-disable object-shorthand */

/* eslint-enable object-shorthand */
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
// Incorrect Code
var foo = {
  "bar-baz"() {}
};

// Correct Code
var foo = {
  "bar-baz": function() {},
  "qux": qux
};
/* eslint-disable object-shorthand */

/*eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }]*/
// Correct Code
var foo = {
  ConstructorFunction: function() {}
};

/*eslint object-shorthand: ["error", "always", { "methodsIgnorePattern": "^bar$" }]*/
// Correct Code
var foo = {
  bar: function() {}
};

/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
// Incorrect Code
var foo = {
  foo: (bar, baz) => {
    return bar + baz;
  },

  qux: (foobar) => {
    return foobar * 2;
  }
};

// Correct Code
var foo = {
  foo(bar, baz) {
    return bar + baz;
  },

  qux: foobar => foobar * 2
};

/*eslint object-shorthand: ["error", "consistent"]*/
// Incorrect Code
var foo = {
  a,
  b: "foo",
};

// Correct Code
var foo = {
  a: a,
  b: "foo"
};

var bar = {
  a,
  b,
};

/*eslint object-shorthand: ["error", "consistent-as-needed"]*/
// Incorrect Code
var foo = {
  a: a,
  b: b,
};
