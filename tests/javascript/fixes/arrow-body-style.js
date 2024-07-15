/* eslint-disable */
/* eslint-enable arrow-body-style */
/*eslint arrow-body-style: ["error", "as-needed"]*/
function incorrect() {
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
