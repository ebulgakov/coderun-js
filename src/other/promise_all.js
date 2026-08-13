// Time Complexity - O(N)
function myPromiseAll(tasks) {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) return resolve([]);

    let completedCount = 0;
    const result = new Array(tasks.length);

    tasks.forEach((task, taskIdx) => {
      Promise.resolve(task)
        .then(val => {
          result[taskIdx] = val;
          completedCount += 1;

          if (completedCount === tasks.length) {
            resolve(result);
          }
        })
        .catch(reject);
    }); // O(N)
  });
}

export default myPromiseAll;
