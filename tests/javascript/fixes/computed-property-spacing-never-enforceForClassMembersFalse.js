/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function correct() {
  /*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": false }]*/
  /*eslint-env es6*/

  class Foo {
    [a ]() {}
    get [b ]() {}
    set [b ](value) {}
  }

  const Bar = class {
    [ a](){}
    static [ b]() {}
    static get [ c ]() {}
    static set [ c ](value) {}
  }
}
