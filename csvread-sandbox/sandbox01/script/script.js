(function () {
  const fileElem = document.getElementById("file");
  const sjisElem = document.getElementById("sjis");
  const utf8Elem = document.getElementById("utf8");
  const errorTextElem = document.getElementById("errorText");
  const csvTableElem = document.getElementById("csvTable");

  const csvReader = new CsvReader();

  function clearTable() {
    while (csvTableElem.firstChild) {
      csvTableElem.removeChild(csvTableElem.firstChild);
    }
  }

  function load(csvText) {
    // 絵文字などを正しく取り込めるようにするために 配列にする
    const csvRecords = csvReader.readAll([...csvText]);
    if (csvRecords.length === 0) {
      return;
    }

    // 表示用にヘッダと明細に分割
    const [csvHeader, ...csvDetails] = csvRecords;

    // -----------------------
    // header
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    for (const h of csvHeader) {
      const th = document.createElement("th");
      th.textContent = h;
      tr.append(th);
    }
    thead.append(tr);
    csvTableElem.append(thead);

    // -----------------------
    // detail
    const tbody = document.createElement("tbody");
    for (const csvDetail of csvDetails) {
      const tr = document.createElement("tr");
      for (const d of csvDetail) {
        const td = document.createElement("td");
        td.textContent = d;
        tr.append(td);
      }
      tbody.append(tr);
    }
    csvTableElem.append(tbody);
  }

  sjisElem.addEventListener("click", async () => {
    clearTable();
    const file = fileElem.files[0];
    if (file == null) {
      return;
    }

    const binary = await file.arrayBuffer();
    const decoder = new TextDecoder("sjis", { fatal: true });
    try{
      errorTextElem.textContent = ""
      const decodedText = decoder.decode(binary);
      load(decodedText);
    } catch(e) {
      console.error(e)
      errorTextElem.textContent = "変換できませんでした。"
    }

  });

  utf8Elem.addEventListener("click", async () => {
    clearTable();
    const file = fileElem.files[0];
    if (file == null) {
      return;
    }
    
    const binary = await file.arrayBuffer();
    const decoder = new TextDecoder("utf-8", { fatal: true });
    try{
      errorTextElem.textContent = ""
      const decodedText = decoder.decode(binary);
      load(decodedText);
    } catch(e) {
      console.error(e)
      errorTextElem.textContent = "変換できませんでした。"
    }

  });
})();
