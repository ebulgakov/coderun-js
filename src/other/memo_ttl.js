function memoize(fn, ttl) {
  const cache = new Map();

  return async function (...args) {
    // можно сериализовать args в строку через JSON.stringify для простоты ключа
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const { promise, expire } = cache.get(key);

      // По истечении ttl кэш для этих аргументов инвалидируется. Если текущее время меньше времени удаления
      if (Date.now() < expire) {
        return promise;
      }

      cache.delete(key);
    }

    // (1) Поддержка асинхронных функций. (2) Функция должна поддерживать любое количество аргументов
    const promiseResult = Promise.resolve(fn(...args));

    cache.set(key, {
      promise: promiseResult,
      expire: Date.now() + ttl // Удобнее так, чем через setTimeout
    });

    // Чтобы не копить в кеше битые промисы
    promiseResult.catch(() => {
      cache.delete(key);
    });

    return promiseResult;
  };
}

export default memoize;
