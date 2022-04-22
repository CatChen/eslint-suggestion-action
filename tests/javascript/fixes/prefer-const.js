/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-const-assign, no-constant-condition */
function incorrect() {
  /*eslint prefer-const: "error"*/

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
  /*eslint prefer-const: "error"*/

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
