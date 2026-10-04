/* eslint-disable */
/* eslint-enable use-isnan */
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/
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
