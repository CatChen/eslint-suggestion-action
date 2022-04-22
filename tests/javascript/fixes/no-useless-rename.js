/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, no-import-assign, @typescript-eslint/no-empty-function */
function correct() {
  /*eslint no-useless-rename: ["error", { ignoreImport: true }]*/

  import { foo as foo } from "bar";
}
