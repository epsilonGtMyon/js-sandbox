(function(){
  const myTextareaElem = document.getElementById("myTextarea");
  const executeElem = document.getElementById("execute");
  const sjisResultElem = document.getElementById("sjisResult");

  function isSjis(value) {
    const unicodeArray = Encoding.stringToCode(value);
    const sjisArray = Encoding.convert(unicodeArray, {
      from: "UNICODE",
      to: "SJIS",
    });

    const reversedArray = Encoding.convert(sjisArray, {
      from: "SJIS",
      to: "UNICODE",
    });
    const reversedText = Encoding.codeToString(reversedArray);
    return value === reversedText
  }
  
  executeElem.addEventListener("click", () => {
    const textareaValue = myTextareaElem.value;
    const r = isSjis(textareaValue)
    sjisResultElem.textContent = r ? 'SJISに変換可能' : 'SJISに変換不可能'
  })

})()