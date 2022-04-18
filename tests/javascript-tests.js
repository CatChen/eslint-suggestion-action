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

/* no-extra-semi */

var x = 5;;

function foo() {
  // code
}

class C {
  field;;

  method() {
    // code
  }

  static {
    // code
  }
}

/* --- */

var x = 5;

function foo() {
  // code
}

var bar = function () {
  // code
};

class C {
  field;

  method() {
    // code
  }

  static {
    // code
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
