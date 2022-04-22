/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

  new RegExp(/abc/);

  new RegExp(/abc/, 'u');
}

function correct() {
  /*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

  /abc/;

  /abc/u;

  new RegExp(/abc/, flags);
}  
