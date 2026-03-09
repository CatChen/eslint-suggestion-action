/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/
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
