/* eslint-disable */
/* eslint-enable arrow-body-style */
/*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
function incorrect() {
  /*eslint-env es6*/
  let foo = () => ({});
  let foo = () => ({ bar: 0 });
}

function correct() {
  /*eslint-env es6*/

  let foo = () => {};
  let foo = () => { return { bar: 0 }; };
}
