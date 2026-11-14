/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
function foo1() {
  var bar;
  var baz;
  let qux,
      norf;
}

function foo2() {
  const bar = 1,
        baz = 2;
  let qux,
      norf;
}
