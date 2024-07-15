/* eslint-disable */
/* eslint-enable arrow-parens */
/*eslint arrow-parens: ["error", "as-needed"]*/
function incorrect() {
  /*eslint-env es6*/

  (a) => {};
  (a) => a;
  (a) => {'\n'};
  a.then((foo) => {});
  a.then((foo) => a);
  a((foo) => { if (true) {} });
  const f = /** @type {number} */(a) => a + a;
  const g = /* comment */ (a) => a + a;
  const h = (a) /* comment */ => a + a;
}

function correct() {
  /*eslint-env es6*/

  () => {};
  a => {};
  a => a;
  a => {'\n'};
  a.then(foo => {});
  a.then(foo => { if (true) {} });
  (a, b, c) => a;
  (a = 10) => a;
  ([a, b]) => a;
  ({a, b}) => a;
  const f = (/** @type {number} */a) => a + a;
  const g = (/* comment */ a) => a + a;
  const h = (a /* comment */) => a + a;
}
