/* eslint-disable */
/* eslint-enable comma-spacing */
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/
function incorrect() {
  var foo = 1 ,bar = 2;
  var arr = [1 , 2];
  var obj = {"foo": "bar" ,"baz": "qur"};
  foo(a ,b);
  new Foo(a ,b);
  function foo(a ,b){}
  a ,b
}

function correct() {
  var foo = 1, bar = 2
      , baz = 3;
  var arr = [1, 2];
  var arr = [1,, 3]
  var obj = {"foo": "bar", "baz": "qur"};
  foo(a, b);
  new Foo(a, b);
  function foo(a, b){}
  a, b

  var arr = [ , 2, 3 ]
}
