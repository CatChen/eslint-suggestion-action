/* eslint-disable */
/* eslint-enable no-useless-rename */

/*eslint no-useless-rename: "error"*/
// Incorrect Code
import { foo as foo } from "bar";
export { foo as foo };
export { foo as foo } from "bar";
let { foo: foo } = bar;
let { 'foo': foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}

// Correct Code
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

/*eslint no-useless-rename: ["error", { ignoreImport: true }]*/
// Correct Code
import { foo as foo } from "bar";

/*eslint no-useless-rename: ["error", { ignoreExport: true }]*/
// Correct Code
export { foo as foo };
export { foo as foo } from "bar";

/*eslint no-useless-rename: ["error", { ignoreDestructuring: true }]*/
// Correct Code
let { foo: foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
