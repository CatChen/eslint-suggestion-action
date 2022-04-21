/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
  /*eslint-env es6*/
  let foo = () => ({});
  let foo = () => ({ bar: 0 });
}

function correct() {
  /*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
  /*eslint-env es6*/

  let foo = () => {};
  let foo = () => { return { bar: 0 }; };
}
