/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
// using const.
const a = 0;

// it's never initialized.
let b;
console.log(b);

// it's reassigned after initialized.
let c;
c = 0;
c = 1;
console.log(c);

// it's initialized in a different block from the declaration.
let d;
if (true) {
    d = 0;
}
console.log(d);

// it's initialized in a different scope.
let e;
class C {
    #x;
    static {
        e = obj => obj.#x;
    }
}

// it's initialized at a place that we cannot write a variable declaration.
let f;
if (true) f = 0;
console.log(f);

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
    console.log(i);
}

// `predicate` is only assigned once but cannot be separately declared as `const`
let predicate;
[object.type, predicate] = foo();

// `g` is only assigned once but cannot be separately declared as `const`
let g;
const h = {};
({ g, c: h.c } = func());

// suggest to use `no-var` rule.
var i = 3;
console.log(i);
