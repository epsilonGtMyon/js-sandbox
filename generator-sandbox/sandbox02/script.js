(function () {
  const async1ButtonElem = document.getElementById("async1");
  const async2ButtonElem = document.getElementById("async2");
  const async3ButtonElem = document.getElementById("async3");
  const async4ButtonElem = document.getElementById("async4");
  const async5ButtonElem = document.getElementById("async5");

  const async6InfinityButtonElem = document.getElementById("async6Infinity");
  const returnInfinityButtonElem = document.getElementById("returnInfinity");
  const throwInfinityButtonElem = document.getElementById("throwInfinity");

  const consoleElem = document.getElementById("console");

  async function sleep(mills) {
    return new Promise((resolve) => setTimeout(() => resolve(), mills));
  }

  function clearConsole() {
    while (consoleElem.firstChild) {
      consoleElem.removeChild(consoleElem.firstChild);
    }
  }

  function log(text) {
    const div = document.createElement("div");
    div.textContent = text;
    consoleElem.append(div);
    consoleElem.parentElement.scrollTo(
      0,
      consoleElem.parentElement.scrollHeight
    );
  }

  // 非同期ジェネレータ
  async function* generate(count) {
    for (let i = 1; i <= count; i++) {
      if (i > 1) {
        await sleep(1000);
      }

      yield {
        message: `count: ${i} / ${count}`,
      };
    }
  }

  async1ButtonElem.addEventListener("click", async () => {
    clearConsole();

    const generator = generate(5);

    for (let i = 0; i < 7; i++) {
      // nextで次の値をとれるが
      // Promiseになっているのでawaitで待つ
      const gen = await generator.next();

      // あとは同期の時と同じ
      log(`[${i}] done:${gen.done}`);
      if (!gen.done) {
        log(`[${i}] value.message:${gen.value.message}`);
      }
    }
  });

  async2ButtonElem.addEventListener("click", async () => {
    clearConsole();

    const generator = generate(5);

    for (let i = 0; i < 7; i++) {
      const gen = await generator.next();
      log(`[${i}] done:${gen.done}`);
      if (!gen.done) {
        log(`[${i}] value.message:${gen.value.message}`);
      }

      if (i === 3) {
        generator.return();
      }
    }
  });

  async3ButtonElem.addEventListener("click", async () => {
    clearConsole();

    // forループで回すことができる
    // その際 for await と記述する。
    for await (let elem of generate(5)) {
      // 要素はyieldで返した内容
      console.log(elem);
      log(`${elem.message}`);
    }
  });

  //-------------------
  async function* generate2(itemPerChunk, chunkCount) {
    for (let i = 1; i <= chunkCount; i++) {
      if (i > 1) {
        log(`sleep ${i}`);
        await sleep(1000);
      }

      for (j = 1; j <= itemPerChunk; j++) {
        const itemNo = `${i} - ${j}`;
        yield {
          chunk: i,
          message: `itemNo: ${itemNo}`,
        };
      }
    }
  }

  async4ButtonElem.addEventListener("click", async () => {
    clearConsole();

    for await (let elem of generate2(5, 10)) {
      log(`${elem.chunk} ${elem.message}`);
    }
  });

  async5ButtonElem.addEventListener("click", async () => {
    clearConsole();
    const generator = generate2(5, 10);
    for (let i = 0; i < 50; i++) {
      // 手動で一つずつ nextを呼び出しても 内側のループが終わったら外側のループが進んでsleepが入っていることがわかる
      const gen = await generator.next();
      if (gen.done) {
        break;
      }

      log(
        `[${i}] gen.value.chunk: ${gen.value.chunk}   gen.value.message: ${gen.value.message}`
      );
    }
  });

  //-------------------
  let generator = null;
  async function* generateInfinity() {
    while (true) {
      await sleep(1000);

      try {
        yield {
          message: `${new Date().toLocaleString()}`,
        };
      } catch (e) {
        console.error("エラーです", e);
        break;
      }
    }
  }
  function returnInfinity() {
    generator?.return();
  }
  function throwInfinity() {
    generator?.throw(new Error("throw!"));
  }
  async6InfinityButtonElem.addEventListener("click", async () => {
    returnInfinity();
    clearConsole();
    generator = generateInfinity();

    for await (let gen of generator) {
      log(`${gen.message}`);
    }
  });
  returnInfinityButtonElem.addEventListener("click", () => {
    returnInfinity();
  });
  throwInfinityButtonElem.addEventListener("click", () => {
    throwInfinity();
  });
})();
