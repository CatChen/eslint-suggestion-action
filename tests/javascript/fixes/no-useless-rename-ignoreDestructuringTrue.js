/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-import-assign, @typescript-eslint/no-empty-function */
function correct() {
  /*eslint no-useless-rename: ["error", { ignoreDestructuring: true }]*/

  let { foo: foo } = bar;
  function foo({ bar: bar }) {}
  ({ foo: foo }) => {}
}
