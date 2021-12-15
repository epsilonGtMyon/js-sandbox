const valueConverters = new Map();
valueConverters.set(Date, (value) => new Date(value));

function deepCopy(value) {
  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    // プリミティブな値
    return value;
  }

  // 固有のコンバータが存在する場合
  const converter = valueConverters.get(value.constructor);
  if (converter) {
    return converter(value);
  }

  // 配列の場合
  if (Array.isArray(value)) {
    const result = [];
    // 内部要素に対して再帰的に
    for (const elem of value) {
      const r = deepCopy(elem);
      result.push(r);
    }

    return result;
  }

  // それ以外
  // {}やクラスのインスタンスの場合
  const result = value.constructor === Object ? {} : new value.constructor();
  const propertyNames = Object.keys(value);
  // 内部のプロパティに対して再帰的に
  for (const propertyName of propertyNames) {
    const v = value[propertyName];
    result[propertyName] = deepCopy(v);
  }
  return result;
}
