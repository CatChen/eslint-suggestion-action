/* eslint-disable */
/* eslint-enable eslint arrow-parens */
function incorrect() {
  /*eslint arrow-parens: ["error", "always"]*/
  /*eslint-env es6*/

  a => {};
  a => a;
  a => {'\n'};
  a.then(foo => {});
  a.then(foo => a);
  a(foo => { if (true) {} });
}

function correct() {
  /*eslint arrow-parens: ["error", "always"]*/
  /*eslint-env es6*/

  () => {};
  (a) => {};
  (a) => a;
  (a) => {'\n'}
  a.then((foo) => {});
  a.then((foo) => { if (true) {} });
}
