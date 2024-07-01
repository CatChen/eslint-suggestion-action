/* eslint-disable */
/* eslint-enable no-useless-rename */
/*eslint no-useless-rename: ["error", { ignoreExport: true }]*/
function correct() {
  export { foo as foo };
  export { foo as foo } from "bar";
}
