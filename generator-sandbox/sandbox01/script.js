(function () {
  const sync1ButtonElem = document.getElementById("sync1");
  const sync2ButtonElem = document.getElementById("sync2");
  const sync3ButtonElem = document.getElementById("sync3");

  const consoleElem = document.getElementById("console");

  function clearConsole() {
    while (consoleElem.firstChild) {
      consoleElem.removeChild(consoleElem.firstChild);
    }
  }

  function log(text) {
    const div = document.createElement("div");
    div.textContent = text;
    consoleElem.append(div);
    consoleElem.parentElement.scrollTo(0, consoleElem.parentElement.scrollHeight)
  }

  function* generate(count) {
    for (let i = 1; i <= count; i++) {
      yield {
        message: `count: ${i} / ${count}`,
      };
    }
  }

  sync1ButtonElem.addEventListener("click", () => {
    clearConsole();

    const generator = generate(5);

    for (let i = 0; i < 7; i++) {
      // nextで次の値をとれる
      const gen = generator.next();

      // valueとdoneがある
      // doneはgeneratorが終了しているか
      // 終了してなかったらvalueがとれる
      log(`[${i}] done:${gen.done}`);
      if (!gen.done) {
        log(`[${i}] value.message:${gen.value.message}`);
      }
    }
  });

  sync2ButtonElem.addEventListener("click", () => {
    clearConsole();

    const generator = generate(5);

    for (let i = 0; i < 7; i++) {
      const gen = generator.next();
      log(`[${i}] done:${gen.done}`);
      if (!gen.done) {
        log(`[${i}] value.message:${gen.value.message}`);
      }

      if (i === 3) {
        // returnを呼ぶとgeneratorが終了する。
        // return に値を渡すこともできるみたい
        generator.return();
      }
    }
  });

  sync3ButtonElem.addEventListener("click", () => {
    clearConsole();

    // forループで回すことができる
    for (let elem of generate(5)) {
      // 要素はyieldで返した内容
      console.log(elem);
      log(`${elem.message}`);
    }
  });
})();
