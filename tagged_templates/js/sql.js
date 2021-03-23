// あくまで使い方の例であって
// フロントでSQLは組み立てないしバインド変数使うべきだし
const sql = (function () {
  function convert(value) {
    const t = typeof value;
    if (t === "string") {
      return `'${value}'`;
    }
    if (t === "number") {
      return `${value}`;
    }
    if (t === "boolean") {
      return convert(value ? "1" : "0");
    }
    return value;
  }

  return function sql(t, ...values) {
    let text = "";
    const len = values.length;
    for (let i = 0; i < len; i++) {
      text += t[i] + convert(values[i]);
    }
    text += t[len];

    return text;
  };
})();
