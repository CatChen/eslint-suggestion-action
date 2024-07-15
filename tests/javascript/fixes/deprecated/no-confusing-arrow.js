/* eslint-disable */
/* eslint-enable no-confusing-arrow */
/*eslint no-confusing-arrow: "error"*/
function incorrect() {
  /*eslint-env es6*/

  var x = a => 1 ? 2 : 3;
  var x = (a) => 1 ? 2 : 3;
}

function correct() {
  /*eslint-env es6*/
  var x = a => (1 ? 2 : 3);
  var x = (a) => (1 ? 2 : 3);
  var x = (a) => {
      return 1 ? 2 : 3;
  };
  var x = a => { return 1 ? 2 : 3; };
}
