/* eslint-disable */
/* eslint-enable arrow-body-style */
function incorrect() {
  /*eslint arrow-body-style: ["error", "never"]*/
  /*eslint-env es6*/

  let foo = () => {
    return 0;
  };
  let foo = (retv, name) => {
    retv[name] = true;
    return retv;
  };
}

function correct() {
  /*eslint arrow-body-style: ["error", "never"]*/
  /*eslint-env es6*/

  let foo = () => 0;
  let foo = () => ({ foo: 0 });
}
