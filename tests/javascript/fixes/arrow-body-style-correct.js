/* eslint-disable */
/* eslint-enable arrow-body-style */
/*eslint arrow-body-style: ["error", "as-needed"]*/
let foo = () => 0;
let foo = (retv, name) => {
  retv[name] = true;
  return retv;
};
let foo = () => ({
  bar: {
    foo: 1,
    bar: 2,
  }
});
let foo = () => { bar(); };
let foo = () => {};
let foo = () => { /* do nothing */ };
let foo = () => {
    // do nothing.
};
let foo = () => ({ bar: 0 });
