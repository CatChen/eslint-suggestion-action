/* eslint-disable @typescript-eslint/no-unused-vars, no-undef, no-redeclare, @typescript-eslint/no-empty-function, no-sparse-arrays, array-bracket-spacing */
function incorrect() {
  /*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

  var foo = 1, bar = 2;
  var arr = [1 , 2];
  var obj = {"foo": "bar", "baz": "qur"};
  new Foo(a,b);
  function foo(a,b){}
  a, b
}

function correct() {
  /*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

  var foo = 1 ,bar = 2 ,
      baz = true;
  var arr = [1 ,2];
  var arr = [1 ,,3]
  var obj = {"foo": "bar" ,"baz": "qur"};
  foo(a ,b);
  new Foo(a ,b);
  function foo(a ,b){}
  a ,b

  var arr = [,2 ,3]
}
