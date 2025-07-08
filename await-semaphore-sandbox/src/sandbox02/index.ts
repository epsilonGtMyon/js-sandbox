import "../style.css";

import {} from "setimmediate";
import { Semaphore } from "await-semaphore";
import { sleep } from "../common/util";
import { log, clearConsole } from "../common/domConsole";

const semaphoreButtonElem = document.getElementById("semaphoreButton")!;
const clearButtonElem = document.getElementById("clearButton")!;

const semaphore = new Semaphore(2);
let counter = 0;

semaphoreButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  //排他を取得して
  //releaseを呼び出したら解放する
  const release = await semaphore.acquire();

  try {
    //この区間にはいれるのは2つの処理だけ
    log(`[${c}]:begin`);
    await sleep(1500);
    log(`[${c}]:end`);
  } finally {
    //finallyで確実に呼ばれるようにしておいたほうがいいだろう
    release();
  }
});

clearButtonElem.addEventListener("click", async () => {
  counter = 0
  clearConsole();
});
