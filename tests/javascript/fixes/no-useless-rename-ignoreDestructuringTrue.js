/* eslint-disable */
/* eslint-enable no-useless-rename */
/*eslint no-useless-rename: ["error", { ignoreDestructuring: true }]*/
function correct() {
  let { foo: foo } = bar;
  function foo({ bar: bar }) {}
  ({ foo: foo }) => {}
}
