function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<Array<{ status: "ok"; value: R } | { status: "error"; reason: unknown }>> {
  const result = [];
  let currentTaskIdx = 0;
  let completedTasksCount = 0;

  return new Promise(resolve => {
    if (items.length === 0) return resolve([]);

    function runTask(idx) {
      fn(items[idx], idx)
        .then(item => {
          result[idx] = { status: "ok", value: item };
          completedTasksCount += 1;

          if (completedTasksCount === items.length) {
            resolve(result);
          } else if (currentTaskIdx < items.length) {
            runTask(currentTaskIdx);
            currentTaskIdx += 1;
          }
        })
        .catch(reason => {
          result[idx] = { status: "error", reason };
          completedTasksCount += 1;

          if (completedTasksCount === items.length) {
            resolve(result);
          } else if (currentTaskIdx < items.length) {
            runTask(currentTaskIdx);
            currentTaskIdx += 1;
          }
        });
    }

    const maxLimit = Math.min(limit, items.length);
    for (let i = 0; i < maxLimit; i += 1) {
      runTask(i);
      currentTaskIdx += 1;
    }
  });
}

export default mapWithConcurrency;
