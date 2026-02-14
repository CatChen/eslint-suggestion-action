/* eslint-disable */
/* eslint-enable no-useless-rename */
/*eslint no-useless-rename: "error"*/
import { foo1 as foo1 } from "bar";
import { "foo2" as foo2 } from "bar";
export { foo1 as foo1 };
export { foo2 as "foo2" };
export { foo3 as foo3 } from "bar";
export { "foo4" as "foo4" } from "bar";
let { foo3: foo3 } = bar;
let { 'foo4': foo4 } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
