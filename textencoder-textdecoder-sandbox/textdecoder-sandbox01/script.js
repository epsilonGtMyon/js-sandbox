(function () {
  const fileElem = document.getElementById("file");
  const errorMessageElem = document.getElementById("errorMessage");
  const decodeAsSjisElem = document.getElementById("decodeAsSjis");
  const decodeAsUtf8Elem = document.getElementById("decodeAsUtf8");
  const decodeAsUtf16leElem = document.getElementById("decodeAsUtf16le");
  const decodeAsUtf16beElem = document.getElementById("decodeAsUtf16be");

  const myTextareaElem = document.getElementById("myTextarea");

  // https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings
  const decoders = new Map(
    ["sjis", "utf-8", "utf-16le", "utf-16be"].map((enc) => [
      enc,
      new TextDecoder(enc, { fatal: true }),
    ])
  );

  async function decode(encoding, file) {
    if (file == null) {
      return null;
    }

    const binary = new Uint8Array(await file.arrayBuffer());

    const decoder = decoders.get(encoding);
    const decoded = decoder.decode(binary);
    return decoded;
  }

  async function execute(encoding) {
    const file = fileElem.files[0];
    errorMessageElem.textContent = "";
    try {
      myTextareaElem.value = await decode(encoding, file);
    } catch {
      errorMessageElem.textContent = "デコードできませんでした。";
    }
  }

  decodeAsSjisElem.addEventListener("click", () => {
    execute("sjis")
  });
  decodeAsUtf8Elem.addEventListener("click", () => {
    execute("utf-8")
  });
  decodeAsUtf16leElem.addEventListener("click", () => {
    execute("utf-16le")
  });
  decodeAsUtf16beElem.addEventListener("click", () => {
    execute("utf-16be")
  });
})();
