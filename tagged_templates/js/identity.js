const identity = (function () {
  //tはテンプレート文字列の配列の
  //`aaa${x}bbb${y}ccc`ならば["aaa", "bbb", "ccc", raw]
  //rawは入力された通りの文字がはいった配列だそうだ
  //valuesには[x, y]がはいっている
  //
  //`${x}aaa`の場合はtの先頭は空文字列
  return function identity(t, ...values) {
    //とりあえず何もしないそのまま返すやつ
    //少し違うけどString.rawと似たような感じ
    let text = "";
    const len = values.length;
    for (let i = 0; i < len; i++) {
      text += t[i] + values[i];
    }
    text += t[len];

    return text;
  };
})();
