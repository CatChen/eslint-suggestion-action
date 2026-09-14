/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
function foo1() {
  let a,
      b;
  let c;

  var d,
      e;
}

function foo2() {
  const a = 1,
        b = 2;
  const c = 3;

  var d,
      e;
}
