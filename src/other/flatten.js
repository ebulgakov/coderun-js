function flattenRec(arr, depth = 1) {
  if (!Array.isArray(arr)) return arr; // значит примитив
  if (depth < 1) return arr.slice(); // поверхностное копирование

  const result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenRec(item, depth === Infinity ? Infinity : depth - 1)); // ... делаем плоским
    } else {
      result.push(item);
    }
  }

  return result;
}

function flattenInc(arr, depth = 1) {
  const result = [];
  const stack = arr.map(item => [item, depth]); // пары [значение, остаток глубины]

  while (stack.length) {
    const [item, d] = stack.pop();

    if (Array.isArray(item) && d > 0) {
      for (const x of item) stack.push([x, d - 1]);
    } else {
      result.push(item);
    }
  }

  return result.reverse(); // ← pop() даёт обратный порядок
}

export { flattenInc, flattenRec };
