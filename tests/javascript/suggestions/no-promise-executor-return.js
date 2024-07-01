/* eslint-disable */
/* eslint-enable no-promise-executor-return */
/*eslint no-promise-executor-return: "error"*/
function incorrect() {
  new Promise((resolve, reject) => {
      if (someCondition) {
          return defaultResult;
      }
      getSomething((err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });

  new Promise((resolve, reject) => getSomething((err, data) => {
      if (err) {
          reject(err);
      } else {
          resolve(data);
      }
  }));

  new Promise(() => {
      return 1;
  });

  new Promise(r => r(1));
}

function correct() {
  // Turn return inline into two lines
  new Promise((resolve, reject) => {
    if (someCondition) {
        resolve(defaultResult);
        return;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
  });

  // Add curly braces
  new Promise((resolve, reject) => {
    getSomething((err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
  });

  new Promise(r => { r(1) });
  // or just use Promise.resolve
  Promise.resolve(1);
}
