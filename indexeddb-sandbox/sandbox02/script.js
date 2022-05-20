(async function () {
  //レコードを読み込む
  //毎回リクエスト飛ぶけど
  //やりたいこととは別の問題なので対応していない
  const r = await fetch("./pokemon.json");
  const records = await r.json();

  //-----------------------------------
  const dbName = "MyTestDatabase2";
  const dbVersion = 1;

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


  const STORES = Object.freeze({
    POKEMON: Object.freeze({
      name: "pokemon",
      index1: "idxBaseTotal",
    }),
  });

  //DBを開く
  const openDb = () => {
    return window.indexedDB.open(dbName, dbVersion);
  };

  const init = () => {
    const openReq = openDb();
    openReq.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log(`version:${event.oldVersion} -> ${event.newVersion}`);

      //breakせずにスルーしていくことで順次変更を適用していく
      switch (event.oldVersion) {
        case 0: {
          //最初は0なのでcaseを用意しておかないと1が流れない
        }
        case 1: {
          const hogeStore = db.createObjectStore(STORES.POKEMON.name, {
            keyPath: "no",
          });
          //種族値合計でインデックスを作る
          hogeStore.createIndex(STORES.POKEMON.index1, "baseTotal");

          records.forEach((rec) => {
            hogeStore.put(rec);
          });
        }
      }
    };
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
  searchByNumberButtonElem.addEventListener("click", () => {
    clearSearchResultTable();
    if (isNaN(noElem.valueAsNumber)) {
      return;
    }

    const openReq = openDb();
    openReq.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction([STORES.POKEMON.name]);
      const pStore = tx.objectStore(STORES.POKEMON.name);

      const getReq = pStore.get(noElem.valueAsNumber);

      getReq.onsuccess = (event) => {
        if (event.target.result) {
          appendToSearchResult(event.target.result);
        }
      };
    };
  });

  //種族値合計で検索
  searchBybaseTotalButtonElem.addEventListener("click", () => {
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

    const openReq = openDb();
    openReq.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction([STORES.POKEMON.name]);
      const pStore = tx.objectStore(STORES.POKEMON.name);

      const index = pStore.index(STORES.POKEMON.index1);
      let query = undefined;
      if (baseTotalFromElem.value === "" && baseTotalToElem.value === "") {
      } else if (baseTotalFromElem.value === "") {
        query = IDBKeyRange.upperBound(baseTotalToElem.valueAsNumber);
      } else if (baseTotalToElem.value === "") {
        query = IDBKeyRange.lowerBound(baseTotalFromElem.valueAsNumber);
      } else {
        query = IDBKeyRange.bound(
          baseTotalFromElem.valueAsNumber,
          baseTotalToElem.valueAsNumber
        );
      }

      // 今回の用途ならこれで十分だけど、学習のために↑の方法で書いている
      // const from = isNaN(baseTotalFromElem.valueAsNumber) ? undefined : baseTotalFromElem.valueAsNumber
      // const to = isNaN(baseTotalToElem.valueAsNumber) ? undefined : baseTotalToElem.valueAsNumber
      // const query = IDBKeyRange.bound(from, to)

      const getReq = index.getAll(query);
      getReq.onsuccess = (event) => {
        appendToSearchResult(event.target.result);
      };
    };
  });

  //名前で検索
  searchByNameButtonElem.addEventListener("click", () => {
    clearSearchResultTable();
    if (nameElem.value === "") {
      return;
    }
    const openReq = openDb();
    openReq.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction([STORES.POKEMON.name]);
      const pStore = tx.objectStore(STORES.POKEMON.name);

      const result = [];
      const openReq = pStore.openCursor();
      openReq.onsuccess = (event) => {
        //このハンドラはカーソルにレコードがある限り呼ばれる
        const cursor = event.target.result;
        if (cursor == null) {
          //最後
          appendToSearchResult(result);
          return;
        }
        const record = cursor.value;
        if (record.name.includes(nameElem.value)) {
          result.push(record);
        }

        //カーソルを次へ
        cursor.continue();
      };
    };
  });

  init();
})();
