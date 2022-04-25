/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint arrow-spacing: "error"*/
  /*eslint-env es6*/

  ()=> {};
  () =>{};
  (a)=> {};
  (a) =>{};
  a =>a;
  a=> a;
  ()=> {'\n'};
  () =>{'\n'};
}

function correct() {
  /*eslint arrow-spacing: "error"*/
  /*eslint-env es6*/

  () => {};
  (a) => {};
  a => a;
  () => {'\n'};
}
