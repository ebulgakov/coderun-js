const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {string} url
 * @param {Object} options - стандартные опции fetch + объект retry
 */
async function fetchWithRetry(url, options = {}) {
  const { retry = {}, ...fetchOptions } = options;
  const { retries = 3, delay = 1000, multiplier = 2 } = retry;

  let currentDelay = delay;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, fetchOptions);

      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      // Если 500+ и это последняя попытка, то кидаем ошибку
      if (attempt === retries) {
        throw new Error(`Server returns status ${response.status}`);
      }
    } catch (error) {
      // Падаем либо на сетевых ошибках, либо с ошибки выше
      if (attempt === retries) {
        throw error;
      }
    }

    await sleep(currentDelay);
    currentDelay *= multiplier;
  }
}

export default fetchWithRetry;
