function deepClone(obj, hash = new WeakMap()) {
  const isNull = obj === null;
  const isPrimitive = typeof obj !== "object";
  const isArray = typeof obj === "object" && Array.isArray(obj);
  const isMap = obj instanceof Map;
  const isDate = obj instanceof Date;

  if (isPrimitive || isNull) return obj;
  if (isMap) return new Map(obj);
  if (isDate) return new Date(obj.getTime());
  if (hash.has(obj)) return hash.get(obj); // Защита от цикличных ссылок

  // Object.create... - это стандартная практика копирования объекта готового для заполнения
  const clone = isArray ? [] : Object.create(Object.getPrototypeOf(obj));

  // В хеш нужно вставить новый клон до того, как пойдёт обход по потомкам
  hash.set(obj, clone);

  for (let key in obj) {
    clone[key] = deepClone(obj[key], hash);
  }

  return clone;
}

export default deepClone;
