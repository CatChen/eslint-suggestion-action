/* eslint-disable */
/* eslint-enable no-useless-rename */
/*eslint no-useless-rename: "error"*/
function incorrect() {
  import { foo as foo } from "bar";
  export { foo as foo };
  export { foo as foo } from "bar";
  let { foo: foo } = bar;
  let { 'foo': foo } = bar;
  function foo({ bar: bar }) {}
  ({ foo: foo }) => {}
}

function correct() {
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
