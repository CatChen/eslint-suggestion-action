/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/
  /*eslint-env es6*/

  () =>{};
  (a) => {};
  ()=>{'\n'};
}

function correct() {
  /*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/
  /*eslint-env es6*/

  ()=> {};
  (a)=> {};
  ()=> {'\n'};
}
