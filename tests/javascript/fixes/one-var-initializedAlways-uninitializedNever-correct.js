/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/
function foo() {
  var a;
  var b;
  var c;
  var foo = true,
      bar = false;
}

for (let z of foo) {
  doSomething(z);
}

let z;
for (z of foo) {
  doSomething(z);
}
