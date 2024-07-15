/* eslint-disable */
/* eslint-enable one-var */
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive" }]*/
function foo1() {
  let a,
      b;

  var d;
  var e;

  let f;
}

function foo2() {
  const a = 1,
        b = 2;

  var c;
  var d;

  const e = 3;
}
