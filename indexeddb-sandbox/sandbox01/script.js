(function () {
  const dbName = "MyTestDatabase";
  const dbVersion = 1;

  const hogeValueElem = document.querySelector("#hogeValue");
  const addHogeButtonElem = document.querySelector("#addHogeButton");
  const dropDataBaseButtonElem = document.querySelector("#dropDataBaseButton");
  const clearHogeButtonElem = document.querySelector("#clearHogeButton");
  const searchHogeButtonElem = document.querySelector("#searchHogeButton");
  const searchResultElem = document.querySelector("#searchResult");

  const STORES = Object.freeze({
    HOGE: "hoge",
  });

  //DBを開く
  const openDb = () => {
    return window.indexedDB.open(dbName, dbVersion);
  };

  const init = () => {
    const request = openDb();
    request.onupgradeneeded = (event) => {
      //ストアの作成はこのタイミングでしかできない
      console.log("onupgradeneeded", event);
      const db = event.target.result;
      console.log(`version:${event.oldVersion} -> ${event.newVersion}`);

      //breakせずにスルーしていくことで順次変更を適用していく
      switch (event.oldVersion) {
        case 0: {
          //最初は0なのでcaseを用意しておかないと1が流れない
        }
        case 1: {
          db.createObjectStore(STORES.HOGE, { keyPath: "id" });
        }
      }
    };

    request.onsuccess = (event) => {
      console.log("open:onsuccess", event);
    };

    request.onerror = (event) => {
      console.error("open:onerror", event);
    };
  };

  const clearSearchResultTable = () => {
    const appendTarget = searchResultElem.querySelector("tbody")
    while (appendTarget.firstChild) {
      appendTarget.removeChild(appendTarget.firstChild);
    }
  }

  addHogeButtonElem.addEventListener("click", () => {
    const hogeValue = hogeValueElem.value;

    const request = openDb();
    console.log(request)
    request.onsuccess = (event) => {
      const db = event.target.result;

      //トランザクションの作成
      //第2引数でモードを指定
      //コミットは一連の操作が成功したら自動で実行される。
      const tx = db.transaction([STORES.HOGE], "readwrite");

      //操作対象のストアはトランザクションから 取得する。
      const hogeStore = tx.objectStore(STORES.HOGE);

      const putReq = hogeStore.put({
        id: Date.now().toString(),
        hogeValue,
      });

      putReq.onsuccess = () => {
        console.log("putReq:onsuccess");
      };
      putReq.onerror = (event) => {
        console.log("putReq:onerror", event);
      }
      tx.oncomplete = () => {
        console.log("tx:oncomplete");
        hogeValueElem.value = ""
      };
    };
  });

  dropDataBaseButtonElem.addEventListener("click", () => {
    //データベースの削除
    const request = window.indexedDB.deleteDatabase(dbName)
    console.log("drop", request)
    request.onsuccess = () => {
      console.log("deleteDatabase:success")
    }
    request.onerror = (event) => {
      console.error("deleteDatabase:onerror", event);
    };

  })

  clearHogeButtonElem.addEventListener("click", () => {
    clearSearchResultTable()
  })

  searchHogeButtonElem.addEventListener("click", () => {
    //ストアの参照
    const request = openDb();
    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction([STORES.HOGE]);

      //書き込まないときは第2引数なくてもいい？
      const hogeStore = tx.objectStore(STORES.HOGE);
      //取得系のメソッドはたくさんあるがここではgetAll
      const hogeGetAllReq = hogeStore.getAll();
      hogeGetAllReq.onsuccess = (event) => {
        clearSearchResultTable()
        const allHoge = event.target.result;
        const appendTarget = searchResultElem.querySelector("tbody")
        for (const hoge of allHoge) {
          const tr = document.createElement("tr");
          const td1 = document.createElement("td")
          const td2 = document.createElement("td")

          td1.textContent = hoge.id
          td2.textContent = hoge.hogeValue
          tr.append(td1)
          tr.append(td2)
          appendTarget.append(tr);
        }
      };
    };
  });

  init();
})();
