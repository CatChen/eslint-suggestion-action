/* eslint-disable */
/* eslint-enable arrow-spacing */
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
