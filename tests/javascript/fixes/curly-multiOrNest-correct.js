/* eslint-disable */
/* eslint-enable curly */
/*eslint curly: ["error", "multi-or-nest"]*/
if (!foo) {
  foo = {
    bar: baz,
    qux: foo
  };
}

while (true) {
if(foo)
    doSomething();
else
    doSomethingElse();
}

if (foo)
  foo++;

while (true)
  doSomething();

for (var i = 0; foo; i++)
  doSomething();
