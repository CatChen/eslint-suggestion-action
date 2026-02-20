/* eslint-disable */
/* eslint-enable arrow-body-style */
/*eslint arrow-body-style: ["error", "never"]*/
let foo = () => {
  return 0;
};
let foo = (retv, name) => {
  retv[name] = true;
  return retv;
};
