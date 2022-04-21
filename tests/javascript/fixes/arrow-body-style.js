/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint arrow-body-style: ["error", "as-needed"]*/
  /*eslint-env es6*/

  let foo = () => {
    return 0;
  };
  let foo = () => {
    return {
      bar: {
        foo: 1,
        bar: 2,
        }
    };
  };
}

function correct() {
  /*eslint arrow-body-style: ["error", "as-needed"]*/
  /*eslint-env es6*/

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
}
