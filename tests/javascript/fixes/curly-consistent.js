/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-unreachable, no-constant-condition */
function incorrect() {
  /*eslint curly: ["error", "multi", "consistent"]*/

  if (foo) {
    bar();
    baz();
  } else
    buz();

  if (foo)
    bar();
  else if (faa)
    bor();
  else {
    other();
    things();
  }

  if (true)
    foo();
  else {
    baz();
  }

  if (foo) {
    foo++;
  }
}

function correct() {
  /*eslint curly: ["error", "multi", "consistent"]*/

  if (foo) {
    bar();
    baz();
  } else {
    buz();
  }

  if (foo) {
    bar();
  } else if (faa) {
    bor();
  } else {
    other();
    things();
  }

  if (true)
    foo();
  else
    baz();

  if (foo)
    foo++;

}
