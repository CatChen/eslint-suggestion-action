/* eslint-disable */
/* eslint-enable arrow-body-style */
/*eslint arrow-body-style: ["error", "always"]*/
function incorrect() {
    /*eslint-env es6*/
  let foo = () => 0;
}

function correct() {
  let foo = () => {
    return 0;
  };
  let foo = (retv, name) => {
    retv[name] = true;
    return retv;
  };
}
