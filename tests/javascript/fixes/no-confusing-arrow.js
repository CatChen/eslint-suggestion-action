/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-constant-condition */
function incorrect() {
  /*eslint no-confusing-arrow: "error"*/
  /*eslint-env es6*/

  var x = a => 1 ? 2 : 3;
  var x = (a) => 1 ? 2 : 3;
}

function correct() {
  /*eslint no-confusing-arrow: "error"*/
  /*eslint-env es6*/
  var x = a => (1 ? 2 : 3);
  var x = (a) => (1 ? 2 : 3);
  var x = (a) => {
      return 1 ? 2 : 3;
  };
  var x = a => { return 1 ? 2 : 3; };
}

function allowParensFalse() {
  function incorrect() {
    /*eslint no-confusing-arrow: ["error", {"allowParens": false}]*/
    /*eslint-env es6*/
    var x = a => (1 ? 2 : 3);
    var x = (a) => (1 ? 2 : 3);
  }
}

function onlyOneSimpleParamTrue() {
  function correct() {
    /*eslint no-confusing-arrow: ["error", {"onlyOneSimpleParam": true}]*/
    /*eslint-env es6*/
    () => 1 ? 2 : 3;
    (a, b) => 1 ? 2 : 3;
    (a = b) => 1 ? 2 : 3;
    ({ a }) => 1 ? 2 : 3;
    ([a]) => 1 ? 2 : 3;
    (...a) => 1 ? 2 : 3;
  }
}