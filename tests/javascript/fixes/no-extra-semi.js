/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-extra-semi */
function incorrect() {
  /*eslint no-extra-semi: "error"*/

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
  /*eslint no-extra-semi: "error"*/

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
