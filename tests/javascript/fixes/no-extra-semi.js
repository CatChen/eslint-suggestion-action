/* eslint-disable */
/* eslint-enable no-extra-semi */
/*eslint no-extra-semi: "error"*/
function incorrect() {
  var x = 5;;

  function foo() {
      // code
  };

  class C {
      field;;

      method() {
          // code
      };

      static {
          // code
      };
  };
}

function correct() {
  var x = 5;

  function foo() {
      // code
  }

  var bar = function() {
      // code
  };

  class C {
      field;

      method() {
          // code
      }

      static {
          // code
      }
  }
}
