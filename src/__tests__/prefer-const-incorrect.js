/* eslint-disable */
/* eslint-enable prefer-const */
/*eslint prefer-const: "error"*/
// it's initialized and never reassigned.
let a = 3;
console.log(a);

let b;
b = 0;
console.log(b);

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
