/* eslint-disable */
/* eslint-enable prefer-regex-literals */
/*eslint prefer-regex-literals: "error"*/
function incorrect() {
  new RegExp("abc");

  new RegExp("abc", "u");

  RegExp("abc");

  RegExp("abc", "u");

  new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");

  RegExp(`^\\d\\.$`);

  new RegExp(String.raw`^\d\.$`);
}

function correct() {
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
