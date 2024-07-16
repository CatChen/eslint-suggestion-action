/* eslint-disable */
/* eslint-enable one-var */
/*eslint object-shorthand: "error"*/

function incorrect() {
  var foo = {
    w: function() {},
    x: function *() {},
    [y]: function() {},
    z: z
  };
}

/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    "bar-baz"() {}
  };
}

function correct() {
  /*eslint-env es6*/

  var foo = {
    "bar-baz": function() {},
    "qux": qux
  };
}

/*eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }]*/
function correct() {
  /*eslint-env es6*/

  var foo = {
    ConstructorFunction: function() {}
  };

}

/*eslint object-shorthand: ["error", "always", { "methodsIgnorePattern": "^bar$" }]*/
function correct() {
  var foo = {
    bar: function() {}
  };
}

/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    foo: (bar, baz) => {
      return bar + baz;
    },

    qux: (foobar) => {
      return foobar * 2;
    }
  };
}

function correct() {
  /*eslint-env es6*/

  var foo = {
    foo(bar, baz) {
      return bar + baz;
    },

    qux: foobar => foobar * 2
  };
}

/*eslint object-shorthand: ["error", "consistent"]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    a,
    b: "foo",
  };
}

function correct() {
  /*eslint-env es6*/

  var foo = {
    a: a,
    b: "foo"
  };

  var bar = {
    a,
    b,
  };
}

/*eslint object-shorthand: ["error", "consistent-as-needed"]*/
function incorrect() {
  /*eslint-env es6*/

  var foo = {
    a: a,
    b: b,
  };
}
