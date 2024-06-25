/* eslint-disable */
/* eslint-enable no-empty */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
function correct() {
  try {
      doSomething();
  } catch (ex) {}

  try {
      doSomething();
  }
  catch (ex) {}
  finally {
      /* continue regardless of error */
  }
}
