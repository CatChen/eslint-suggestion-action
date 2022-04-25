/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
  /*eslint-env es6*/

  (a) => a;
  a => {};
  a => {'\n'};
  a.map((x) => x * x);
  a.map(x => {
    return x * x;
  });
  a.then(foo => {});
}

function correct() {
  /*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
  /*eslint-env es6*/

  (a) => {};
  (a) => {'\n'};
  a => ({});
  () => {};
  a => a;
  a.then((foo) => {});
  a.then((foo) => { if (true) {} });
  a((foo) => { if (true) {} });
  (a, b, c) => a;
  (a = 10) => a;
  ([a, b]) => a;
  ({a, b}) => a;
}
