/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function */
function always() {
  function incorrect() {
    /*eslint arrow-body-style: ["error", "always"]*/
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
}

function asNeeded() {
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

  function requireReturnForObjectLiteralTrue() {
    function incorrect() {
      /*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
      /*eslint-env es6*/
      let foo = () => ({});
      let foo = () => ({ bar: 0 });
    }
  
    function correct() {
      /*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/
      /*eslint-env es6*/
  
      let foo = () => {};
      let foo = () => { return { bar: 0 }; };
    }
  }
}

function never() {
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
}