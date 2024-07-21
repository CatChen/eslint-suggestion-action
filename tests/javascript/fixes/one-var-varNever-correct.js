/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "never" }]*/
function foo() {
  var bar;
  var baz;

  // `const` and `let` declarations are ignored if they are not specified
  const foobar = 1;
  const foobaz = 2;
  const barfoo = 1, bazfoo = 2;
  let qux;
  let norf;
  let fooqux, foonorf;
}
