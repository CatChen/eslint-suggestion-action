/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-empty */
function correct() {
  /*eslint yoda: ["error", "never", { "exceptRange": true }]*/

  function isReddish(color) {
    return (color.hue < 60 || 300 < color.hue);
  }

  if (x < -1 || 1 < x) {
    // ...
  }

  if (count < 10 && (0 <= rand && rand < 1)) {
    // ...
  }

  if (`blue` < x && x < `green`) {
    // ...
  }

  function howLong(arr) {
    return (0 <= arr.length && arr.length < 10) ? "short" : "long";
  }

}
