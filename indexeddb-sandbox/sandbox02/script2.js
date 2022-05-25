(async function () {
  //-----------------------------------
  const dbName = "MyTestDatabase2-Dexie";

  const noElem = document.querySelector("#no");
  const searchByNumberButtonElem = document.querySelector(
    "#searchByNumberButton"
  );

  const baseTotalFromElem = document.querySelector("#baseTotalFrom");
  const baseTotalToElem = document.querySelector("#baseTotalTo");
  const searchBybaseTotalButtonElem = document.querySelector(
    "#searchBybaseTotalButton"
  );
  const nameElem = document.querySelector("#name");
  const searchByNameButtonElem = document.querySelector("#searchByNameButton");

  const searchResultElem = document.querySelector("#searchResult");

  //----------------------------------
  //DB初期化

  const db = new Dexie(dbName);

  db.version(1).stores({
    pokemon: `no, baseTotal`,
  });
  //----------------------------------

  const init = async () => {
    const count = await db.pokemon.count();
    if (count > 0) {
      return;
    }

    const response = await fetch("./pokemon.json");
    const records = await response.json();

    db.pokemon.bulkAdd(records);
  };

  //検索結果のクリア
  const clearSearchResultTable = () => {
    const appendTarget = searchResultElem.querySelector("tbody");
    while (appendTarget.firstChild) {
      appendTarget.removeChild(appendTarget.firstChild);
    }
  };

  //検索結果に反映
  const appendToSearchResult = (records) => {
    if (!Array.isArray(records)) {
      records = [records];
    }

    const appendTarget = searchResultElem.querySelector("tbody");
    const createTd = (value) => {
      const td = document.createElement("td");
      td.textContent = value;
      return td;
    };
    for (const rec of records) {
      const tr = document.createElement("tr");
      tr.append(createTd(rec.no));
      tr.append(createTd(rec.generation));
      tr.append(createTd(rec.name));
      tr.append(createTd(rec.type1));
      tr.append(createTd(rec.type2));
      tr.append(createTd(rec.baseTotal));
      tr.append(createTd(rec.attack));
      tr.append(createTd(rec.defense));
      tr.append(createTd(rec.spAttack));
      tr.append(createTd(rec.spDefense));
      tr.append(createTd(rec.speed));
      tr.append(createTd(rec.hp));
      appendTarget.append(tr);
    }
  };

  //番号で検索
  searchByNumberButtonElem.addEventListener("click", async () => {
    clearSearchResultTable();
    if (isNaN(noElem.valueAsNumber)) {
      return;
    }

    const record = await db.pokemon.get(noElem.valueAsNumber)
    appendToSearchResult(record)
  });

  //種族値合計で検索
  searchBybaseTotalButtonElem.addEventListener("click", async () => {
    clearSearchResultTable();
    //簡易的な数値チェック
    //from
    if (
      baseTotalFromElem.value !== "" &&
      isNaN(baseTotalFromElem.valueAsNumber)
    ) {
      return;
    }

    //to
    if (baseTotalToElem.value !== "" && isNaN(baseTotalToElem.valueAsNumber)) {
      return;
    }

    let query = db.pokemon
    if (baseTotalFromElem.value === "" && baseTotalToElem.value === "") {
    } else if (baseTotalFromElem.value === "") {
      query = query.where('baseTotal').belowOrEqual(baseTotalToElem.valueAsNumber);
    } else if (baseTotalToElem.value === "") {
      query = query.where('baseTotal').aboveOrEqual(baseTotalFromElem.valueAsNumber);
    } else {
      query = query.where('baseTotal').between(
        baseTotalFromElem.valueAsNumber,
        baseTotalToElem.valueAsNumber,
        true,
        true
      );
    }
    const records = await query.toArray()
    appendToSearchResult(records)
  });

  //名前で検索
  searchByNameButtonElem.addEventListener("click", async () => {
    clearSearchResultTable();
    if (nameElem.value === "") {
      return;
    }
    const records = await db.pokemon.filter(r => r.name.includes(nameElem.value)).toArray()
    appendToSearchResult(records);
  });

  init();
})();
