/* eslint-disable */
/* eslint-enable no-useless-rename */
/*eslint no-useless-rename: "error"*/
import * as foo1 from "foo";
import { foo2 } from "bar";
import { foo as bar1 } from "baz";

export { foo };
export { foo as bar1 };
export { foo as bar3 } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [qux]: qux } = bar;

function foo3({ bar }) {}
function foo4({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}
