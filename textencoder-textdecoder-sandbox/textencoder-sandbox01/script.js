(function () {
  const myTextareaElem = document.getElementById("myTextarea");
  const encodeElem = document.getElementById("encode");

  myTextareaElem.value = `あいうえお
かきくけこ
😀
`;

  const textEncoder = new TextEncoder()

  
  function download(binary, filename) {
    const blob = new Blob([binary], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = filename;
    a.href = url;
    a.click();

    URL.revokeObjectURL(url);
  }

  encodeElem.addEventListener("click", () => {
    const text = myTextareaElem.value;

    // Uint8Array
    const encoded = textEncoder.encode(text)

    download(encoded, "エンコード.txt")
  });
})();
