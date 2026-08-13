function flatten(arr, depth = 1) {
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

export default flatten;
