/* eslint-disable */
/* eslint-enable no-misleading-character-class */
/*eslint no-misleading-character-class: error */
function incorrect() {
  /^[Á]$/u;
  /^[❇️]$/u;
  /^[👶🏻]$/u;
  /^[🇯🇵]$/u;
  /^[👨‍👩‍👦]$/u;
  /^[👍]$/;
}

function correct() {
  /^[abc]$/;
  /^[👍]$/u;
  /^[\q{👶🏻}]$/v;
}
