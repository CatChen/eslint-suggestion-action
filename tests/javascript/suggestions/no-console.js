/* eslint-disable */
/* eslint-enable no-console */
/* eslint no-console: "error" */
function incorrect() {
  console.log("Log a debug level message.");
  console.warn("Log a warn level message.");
  console.error("Log an error level message.");
  console.log = foo();
}

function correct() {
  // custom console
  Console.log("Hello world!");
}

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
function correct() {
  console.warn("Log a warn level message.");
  console.error("Log an error level message.");
}
