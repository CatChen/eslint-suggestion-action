/* eslint-disable */
/* eslint-enable prefer-regex-literals */
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
