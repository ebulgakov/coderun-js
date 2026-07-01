function runWithLimit(tasks, limit) {
  const result = [];
  let currentTaskIdx = 0;
  let completedTasksCount = 0;

  return new Promise((resolve, reject) => {
    if (tasks.length === 0) return resolve([]);

    function runTask(idx) {
      Promise.resolve(tasks[idx]())
        .then(task => {
          result[idx] = task;
          completedTasksCount += 1;

          if (completedTasksCount === tasks.length) {
            resolve(result);
          } else if (currentTaskIdx < tasks.length) {
            runTask(currentTaskIdx);
            currentTaskIdx += 1;
          }
        })
        .catch(reject);
    }

    const maxLimit = Math.min(limit, tasks.length);
    for (let i = 0; i < maxLimit; i += 1) {
      runTask(i);
      currentTaskIdx += 1;
    }
  });
}

export default runWithLimit;
