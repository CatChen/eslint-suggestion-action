/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "always", let: "never", const: "never" }]*/
function foo1() {
  var bar,
      baz;
  let qux;
  let norf;
}
  
function foo2() {
  const bar = 1;
  const baz = 2;
  let qux;
  let norf;
}
