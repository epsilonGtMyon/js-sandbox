(function () {
  const addElem = document.getElementById("add");
  const clearElem = document.getElementById("clear");
  const promiseAllElem = document.getElementById("promise_all");
  const promiseAllsettledElem = document.getElementById("promise_allsettled");

  const promisesElem = document.getElementById("promises");
  const promisesElemTbody = promisesElem.querySelector("tbody");

  const messagesElem = document.getElementById("messages");

  const Level = Object.freeze({
    INFO: Symbol("Level.INFO"),
    ERROR: Symbol("Level.ERROR"),
  });

  let rowNo = 1;

  function addRow() {
    const tr = document.createElement("tr");

    const template = `
<td>
  ${rowNo}
</td>
<td>
  <input class="time" type="number" min="1" max="100" value="3"/>
</td>
<td>
  <label>
    <input class="p_result" type="radio" name="p_${rowNo}" value="resolve" checked />resolve
  </label>
  <label>
    <input class="p_result" type="radio" name="p_${rowNo}" value="rejected" />rejected
  </label>
</td>
    `;
    tr.innerHTML = template;

    rowNo++;
    promisesElemTbody.append(tr);
  }

  function collectPromiseSources() {
    const promiseSources = [];
    const trs = promisesElemTbody.querySelectorAll("tr");

    let rowNo = 1;
    for (const tr of trs) {
      const time = tr.querySelector(".time").value;
      const result = [...tr.querySelectorAll(".p_result")].find(
        (x) => x.checked
      ).value;

      promiseSources.push({
        rowNo,
        time,
        result,
      });
      rowNo++;
    }
    return promiseSources;
  }

  function convertToPromise(promiseSource) {
    const rowNo = promiseSource.rowNo;
    const timeMills = Number(promiseSource.time) * 1000;
    const isResolve = promiseSource.result === "resolve";
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isResolve) {
          const message = `resolved ${rowNo}`;
          const x = {
            message,
          };
          console.log(message);
          addMessage(Level.INFO, message);

          resolve(x);
        } else {
          const message = `rejected ${rowNo}`;
          const x = JSON.stringify({
            message,
          });
          console.log(message);
          addMessage(Level.ERROR, message);

          reject(new Error(x));
        }
      }, timeMills);
    });
  }

  function clearMessages() {
    while (messagesElem.firstChild) {
      messagesElem.removeChild(messagesElem.firstChild);
    }
  }

  function addMessage(level, message) {
    const div = document.createElement("div");
    div.textContent = message;
    div.classList.add("message");
    if (level === Level.INFO) {
      div.classList.add("is-info");
    } else if (level === Level.ERROR) {
      div.classList.add("is-error");
    }

    messagesElem.append(div);
  }

  addElem.addEventListener("click", () => {
    addRow();
  });
  clearElem.addEventListener("click", () => {
    while (promisesElemTbody.firstChild) {
      promisesElemTbody.removeChild(promisesElemTbody.firstChild);
    }
    rowNo = 1;

    addRow();
  });
  promiseAllElem.addEventListener("click", async () => {
    clearMessages();
    const promiseSources = collectPromiseSources();
    const promises = promiseSources.map((ps) => convertToPromise(ps));

    try {
      const results = await Promise.all(promises);
      addMessage(Level.INFO, "[Promise.all:resolved] " + JSON.stringify(results));
      console.log(results);
    } catch (e) {
      addMessage(Level.ERROR, "[Promise.all:rejected] " + JSON.stringify(e.message));
      console.error(e);
    }
  });
  promiseAllsettledElem.addEventListener("click", async () => {
    clearMessages();
    const promiseSources = collectPromiseSources();
    const promises = promiseSources.map((ps) => convertToPromise(ps));

    try {
      const results = await Promise.allSettled(promises);
      addMessage(Level.INFO, "[Promise.allSettled:resolved]:" + JSON.stringify(results));
      console.log(results);
    } catch (e) {
      addMessage(Level.ERROR, "[Promise.allSettled:rejected]:" + JSON.stringify(e));
      console.error(e);
    }
  });

  addRow();
})();
