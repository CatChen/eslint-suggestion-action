/* eslint-disable */
/* eslint-enable no-promise-executor-return */
/*eslint no-promise-executor-return: ["error", { allowVoid: true }]*/
new Promise((resolve, reject) => {
  if (someCondition) {
    return void resolve(defaultResult);
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

new Promise((resolve, reject) => void getSomething((err, data) => {
  if (err) {
    reject(err);
  } else {
    resolve(data);
  }
}));

new Promise(r => void r(1));
