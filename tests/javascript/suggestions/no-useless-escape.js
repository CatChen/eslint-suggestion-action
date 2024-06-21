/* eslint-disable */
/* eslint-enable no-useless-escape */
/*eslint no-useless-escape: "error"*/
function incorrect() {
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
