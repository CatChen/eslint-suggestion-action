/* eslint-disable */
/* eslint-enable no-floating-decimal */
/*eslint no-floating-decimal: "error"*/
function incorrect() {
  var num = .5;
  var num = 2.;
  var num = -.7;
}

function correct() {
  var num = 0.5;
  var num = 2.0;
  var num = -0.7;
}
