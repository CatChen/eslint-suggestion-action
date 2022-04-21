/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint prefer-regex-literals: "error"*/

  new RegExp("abc");

  new RegExp("abc", "u");

  RegExp("abc");

  RegExp("abc", "u");

  new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");

  RegExp(`^\\d\\.$`);

  new RegExp(String.raw`^\d\.$`);
}

function correct() {
  /*eslint prefer-regex-literals: "error"*/

  /abc/;

  /abc/u;

  /\d\d\.\d\d\.\d\d\d\d/;

  /^\d\.$/;

  // RegExp constructor is allowed for dynamically generated regular expressions

  new RegExp(pattern);

  RegExp("abc", flags);

  new RegExp(prefix + "abc");

  RegExp(`${prefix}abc`);

  new RegExp(String.raw`^\d\. ${suffix}`);
}

function disallowRedundantWrappingTrue() {
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
}