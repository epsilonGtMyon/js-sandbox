(function () {
  const myTextareaElem = document.getElementById("myTextarea");
  const sjisElem = document.getElementById("sjis");
  const utf8Elem = document.getElementById("utf8");
  const utf16Elem = document.getElementById("utf16");

  myTextareaElem.value = `あいうえお
かきくけこ
`;

  /**
   * ダウンロード
   * @param {Uint8Array} binary バイナリ
   * @param {String} filename ファイル名
   */
  function download(binary, filename) {
    const blob = new Blob([binary], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = filename;
    a.href = url;
    a.click();

    URL.revokeObjectURL(url);
  }

  sjisElem.addEventListener("click", () => {
    const textareaValue = myTextareaElem.value;

    // arrayが返ってくる
    const unicodeArray = Encoding.stringToCode(textareaValue);

    // arrayが返ってくる
    const sjisArray = Encoding.convert(unicodeArray, {
      from: "UNICODE",
      to: "SJIS",
    });

    download(new Uint8Array(sjisArray), "SJIS.txt");
  });

  utf8Elem.addEventListener("click", () => {
    const textareaValue = myTextareaElem.value;

    const unicodeArray = Encoding.stringToCode(textareaValue);

    const utf8Array = Encoding.convert(unicodeArray, {
      from: "UNICODE",
      to: "UTF8",
    });

    download(new Uint8Array(utf8Array), "UTF8.txt");
  });
  
  utf16Elem.addEventListener("click", () => {
    const textareaValue = myTextareaElem.value;

    const unicodeArray = Encoding.stringToCode(textareaValue);

    //convertすることなくそのまま渡す
    // ただし 0～65535なので Uint16Arrayじゃないとだめ
    // まぁわざわざstringToCodeせずそのままtextareaValueをわたせばいいですが..
    download(new Uint16Array(unicodeArray), "UTF16.txt");
  });
  
})();
