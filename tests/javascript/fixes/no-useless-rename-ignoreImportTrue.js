/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-import-assign, @typescript-eslint/no-empty-function */
function incorrect() {
  /*eslint no-useless-rename: "error"*/

  import { foo as foo } from "bar";
  export { foo as foo };
  export { foo as foo } from "bar";
  let { foo: foo } = bar;
  let { 'foo': foo } = bar;
  function foo({ bar: bar }) {}
  ({ foo: foo }) => {}
}

function correct() {
  /*eslint no-useless-rename: "error"*/

  import * as foo from "foo";
  import { foo } from "bar";
  import { foo as bar } from "baz";

  export { foo };
  export { foo as bar };
  export { foo as bar } from "foo";

  let { foo } = bar;
  let { foo: bar } = baz;
  let { [foo]: foo } = bar;

  function foo({ bar }) {}
  function foo({ bar: baz }) {}

  ({ foo }) => {}
  ({ foo: bar }) => {}
}
