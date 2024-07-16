/* eslint-disable */
/* eslint-enable no-empty */
/*eslint no-empty: "error"*/
function incorrect() {
  if (foo) {
  }
  
  while (foo) {
  }
  
  switch(foo) {
  }
  
  try {
    doSomething();
  } catch(ex) {
  
  } finally {
  
  }
}

function correct() {
  if (foo) {
      // empty
  }

  while (foo) {
    /* empty */
  }

  try {
    doSomething();
  } catch (ex) {
    // continue regardless of error
  }

  try {
    doSomething();
  } finally {
    /* continue regardless of error */
  }
}

/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
function correct() {
  try {
    doSomething();
  } catch (ex) {}

  try {
    doSomething();
  }
  catch (ex) {}
  finally {
    /* continue regardless of error */
  }
}
