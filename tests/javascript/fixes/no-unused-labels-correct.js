/* eslint-disable */
/* eslint-enable no-unused-labels */
/*eslint no-unused-labels: "error"*/
A: {
  if (foo()) {
      break A;
  }
  bar();
}

B:
for (let i = 0; i < 10; ++i) {
  if (foo()) {
      break B;
  }
  bar();
}
