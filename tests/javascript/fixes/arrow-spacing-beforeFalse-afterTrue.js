/* eslint-disable */
/* eslint-enable eslint arrow-parens */
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
