/* eslint-disable */
/* eslint-enable prefer-regex-literals */
/*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/
function incorrect() {
  new RegExp(/abc/);

  new RegExp(/abc/, 'u');
}

function correct() {
  /abc/;

  /abc/u;

  new RegExp(/abc/, flags);
}  
