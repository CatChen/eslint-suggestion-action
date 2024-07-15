/* eslint-disable */
/* eslint-enable computed-property-spacing */
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": true }]*/
function incorrect() {
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

function correct() {
  /*eslint-env es6*/

  class Foo {
    [a]() {}
    get [b]() {}
    set [b](value) {}
  }

  const Bar = class {
    [a](){}
    static [b]() {}
    static get [c]() {}
    static set [c](value) {}
  }
}
