/* constructor-super */

class A {
  constructor() {
    super(); // This is a SyntaxError.
  }
}

class A extends B {
  constructor() {} // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class A extends null {
  constructor() {
    super(); // Would throw a TypeError.
  }
}

class A extends null {
  constructor() {} // Would throw a ReferenceError.
}

/* --- */

class A {
  constructor() {}
}

class A extends B {
  constructor() {
    super();
  }
}

/* no-unused-vars */

// It checks variables you have defined as global
some_unused_var = 42;

var x;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function (foo) {
  return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
  if (n < 2) return 1;
  return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
  return y;
}

/* --- */

var x = 10;
alert(x);

// foo is considered used here
myFunc(
  function foo() {
    // ...
  }.bind(this)
);

(function (foo) {
  return foo;
})();

var myFunc;
myFunc = setTimeout(function () {
  // myFunc is considered used
  myFunc();
}, 50);

// Only the second argument from the destructured array is used.
function getY([, y]) {
  return y;
}

/* arrow-body-style: as-needed */

let foo = () => {
  return 0;
};
let foo = () => {
  return {
    bar: {
      foo: 1,
      bar: 2,
    },
  };
};

/* --- */

let foo = () => 0;
let foo = (retv, name) => {
  retv[name] = true;
  return retv;
};
let foo = () => ({
  bar: {
    foo: 1,
    bar: 2,
  },
});
let foo = () => {
  bar();
};
let foo = () => {};
let foo = () => {
  /* do nothing */
};
let foo = () => {
  // do nothing.
};
let foo = () => ({ bar: 0 });

/* no-else-return allowElseIf: true */

function foo() {
  if (x) {
    return y;
  } else {
    return z;
  }
}

function foo() {
  if (x) {
    return y;
  } else if (z) {
    return w;
  } else {
    return t;
  }
}

function foo() {
  if (x) {
    return y;
  } else {
    var t = "foo";
  }

  return t;
}

function foo() {
  if (error) {
    return "It failed";
  } else {
    if (loading) {
      return "It's still loading";
    }
  }
}

// Two warnings for nested occurrences
function foo() {
  if (x) {
    if (y) {
      return y;
    } else {
      return x;
    }
  } else {
    return z;
  }
}

/* --- */

function foo() {
  if (x) {
    return y;
  }

  return z;
}

function foo() {
  if (x) {
    return y;
  } else if (z) {
    var t = "foo";
  } else {
    return w;
  }
}

function foo() {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}

function foo() {
  if (error) {
    return "It failed";
  } else if (loading) {
    return "It's still loading";
  }
}

/* no-useless-escape */

("'");
('"');
("#");
("e");
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
/[a-z\-]/;

/* --- */

('"');
("'");
("\x12");
("\u00a9");
("\371");
("xs\u2111");
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
/[[]/;
/[\]]/;
/[a-z-]/;
