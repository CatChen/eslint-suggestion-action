/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare */
function incorrect() {
  /*eslint no-else-return: "error"*/

  function foo() {
    if (x) {
        return y;
    } else {
        return z;
    }
  }

  function foo() {
    if (x) {
        return y;
    } else if (z) {
        return w;
    } else {
        return t;
    }
  }

  function foo() {
    if (x) {
        return y;
    } else {
        var t = "foo";
    }

    return t;
  }

  function foo() {
    if (error) {
        return 'It failed';
    } else {
        if (loading) {
            return "It's still loading";
        }
    }
  }

  // Two warnings for nested occurrences
  function foo() {
    if (x) {
        if (y) {
            return y;
        } else {
            return x;
        }
    } else {
        return z;
    }
  }
}

function correct() {
  /*eslint no-else-return: "error"*/

  function foo() {
    if (x) {
        return y;
    }

    return z;
  }

  function foo() {
    if (x) {
        return y;
    } else if (z) {
        var t = "foo";
    } else {
        return w;
    }
  }

  function foo() {
    if (x) {
        if (z) {
            return y;
        }
    } else {
        return z;
    }
  }

  function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
  }
}
