/* eslint-disable */
/* eslint-enable curly */
/*eslint curly: ["error", "multi", "consistent"]*/
function incorrect() {
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
