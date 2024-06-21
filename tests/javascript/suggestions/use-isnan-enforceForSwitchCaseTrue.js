/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/
function incorrect() {
  switch (foo) {
      case NaN:
          bar();
          break;
      case 1:
          baz();
          break;
      // ...
  }

  switch (NaN) {
      case a:
          bar();
          break;
      case b:
          baz();
          break;
      // ...
  }

  switch (foo) {
      case Number.NaN:
          bar();
          break;
      case 1:
          baz();
          break;
      // ...
  }

  switch (Number.NaN) {
      case a:
          bar();
          break;
      case b:
          baz();
          break;
      // ...
  }
}

function correct() {
  if (Number.isNaN(foo)) {
      bar();
  } else {
      switch (foo) {
          case 1:
              baz();
              break;
          // ...
      }
  }

  if (Number.isNaN(a)) {
      bar();
  } else if (Number.isNaN(b)) {
      baz();
  } // ...
}
