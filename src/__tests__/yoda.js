/* eslint-disable */
/* eslint-enable yoda */
/*eslint yoda: "error"*/
function incorrect() {
  if ("red" === color) {
    // ...
  }

  if (`red` === color) {
    // ...
  }

  if (`red` === `${color}`) {
    // ...
  }

  if (true == flag) {
    // ...
  }

  if (5 > count) {
    // ...
  }

  if (-1 < str.indexOf(substr)) {
    // ...
  }

  if (0 <= x && x < 1) {
    // ...
  }
}

function correct() {
  if (5 & value) {
    // ...
  }

  if (value === "red") {
    // ...
  }

  if (value === `red`) {
    // ...
  }

  if (`${value}` === `red`) {

  }
}

/*eslint yoda: ["error", "never", { "exceptRange": true }]*/
function correct() {
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

/*eslint yoda: ["error", "never", { "onlyEquality": true }]*/
function correct() {
  if (x < -1 || 9 < x) {
  }

  if (x !== 'foo' && 'bar' != x) {
  }

  if (x !== `foo` && `bar` != x) {
  }
}

/*eslint yoda: ["error", "always"]*/
function incorrect() {
  if (color == "blue") {
    // ...
  }

  if (color == `blue`) {
    // ...
  }
}

function correct() {
  if ("blue" == value) {
    // ...
  }

  if (`blue` == value) {
    // ...
  }

  if (`blue` == `${value}`) {
    // ...
  }

  if (-1 < str.indexOf(substr)) {
    // ...
  }
}
