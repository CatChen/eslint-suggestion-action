/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
function incorrect() {
  // it's initialized and never reassigned.
  let a = 3;
  console.log(a);

  let a;
  a = 0;
  console.log(a);

  class C {
    static {
      let a;
      a = 0;
      console.log(a);
    }
  }

  // `i` is redefined (not reassigned) on each loop step.
  for (let i in [1, 2, 3]) {
    console.log(i);
  }

  // `a` is redefined (not reassigned) on each loop step.
  for (let a of [1, 2, 3]) {
    console.log(a);
  }
}

function correct() {
  // using const.
  const a = 0;

  // it's never initialized.
  let a;
  console.log(a);

  // it's reassigned after initialized.
  let a;
  a = 0;
  a = 1;
  console.log(a);

  // it's initialized in a different block from the declaration.
  let a;
  if (true) {
    a = 0;
  }
  console.log(a);

  // it's initialized in a different scope.
  let a;
  class C {
    #x;
    static {
      a = obj => obj.#x;
    }
  }

  // it's initialized at a place that we cannot write a variable declaration.
  let a;
  if (true) a = 0;
  console.log(a);

  // `i` gets a new binding each iteration
  for (const i in [1, 2, 3]) {
    console.log(i);
  }

  // `a` gets a new binding each iteration
  for (const a of [1, 2, 3]) {
    console.log(a);
  }

  // `end` is never reassigned, but we cannot separate the declarations without modifying the scope.
  for (let i = 0, end = 10; i < end; ++i) {
    console.log(a);
  }

  // `predicate` is only assigned once but cannot be separately declared as `const`
  let predicate;
  [object.type, predicate] = foo();

  // `a` is only assigned once but cannot be separately declared as `const`
  let a;
  const b = {};
  ({ a, c: b.c } = func());

  // suggest to use `no-var` rule.
  var b = 3;
  console.log(b);
}

/*eslint prefer-const: ["error", {"destructuring": "any"}]*/
function incorrect() {
  /*eslint-env es6*/

  let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
  a = a + 1;
}

function correct() {
  /*eslint-env es6*/

  // using const.
  const {a: a0, b} = obj;
  const a = a0 + 1;

  // all variables are reassigned.
  let {a, b} = obj;
  a = a + 1;
  b = b + 1;
}

/*eslint prefer-const: ["error", {"destructuring": "all"}]*/
function incorrect() {
  /*eslint-env es6*/

  // all of `a` and `b` should be const, so those are warned.
  let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                              'b' is never reassigned, use 'const' instead.*/
}

function correct() {
  /*eslint-env es6*/

  // 'b' is never reassigned, but all of `a` and `b` should not be const, so those are ignored.
  let {a, b} = obj;
  a = a + 1;
}

/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/
function correct() {
    /*eslint-env es6*/

  let timer;
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
  timer = setInterval(initialize, 100);
}

/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": false}]*/
function correct() {
    /*eslint-env es6*/

  const timer = setInterval(initialize, 100);
  function initialize() {
    if (foo()) {
      clearInterval(timer);
    }
  }
}
