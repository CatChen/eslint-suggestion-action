/* eslint-disable @typescript-eslint/no-unused-vars, no-undef */
function incorrect() {
  /*eslint no-useless-escape: "error"*/

  "\'";
  '\"';
  "\#";
  "\e";
  `\"`;
  `\"${foo}\"`;
  `\#{foo}`;
  /\!/;
  /\@/;
  /[\[]/;
  /[a-z\-]/;
}

function correct() {
  /*eslint no-useless-escape: "error"*/

  "\"";
  '\'';
  "\x12";
  "\u00a9";
  "\371";
  "xs\u2111";
  `\``;
  `\${${foo}}`;
  `$\{${foo}}`;
  /\\/g;
  /\t/g;
  /\w\$\*\^\./;
  /[[]/;
  /[\]]/;
  /[a-z-]/;
}
