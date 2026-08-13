function flattenRec(arr, depth = 1) {
  if (!Array.isArray(arr)) return arr; // значит примитив
  if (depth < 1) return arr.slice(); // поверхностное копирование

  const result = [];
  const stack = [{ array: arr, index: 0, depth }];

  while (stack.length > 0) {
    const frame = stack[stack.length - 1];

    if (frame.index >= frame.array.length) {
      stack.pop();
      continue;
    }

    const item = frame.array[frame.index++];

    if (Array.isArray(item) && frame.depth > 0) {
      const nextDepth = frame.depth === Infinity ? Infinity : frame.depth - 1;
      stack.push({ array: item, index: 0, depth: nextDepth });
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
