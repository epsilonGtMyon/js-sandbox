import "../style.css";

import {} from "setimmediate";
import { Mutex } from "await-semaphore";
import { sleep } from "../common/util";
import { log, clearConsole } from "../common/domConsole";

const mutexButtonElem = document.getElementById("mutexButton")!;
const clearButtonElem = document.getElementById("clearButton")!;

const mutex = new Mutex();
let counter = 0;

mutexButtonElem.addEventListener("click", async () => {
  const c = ++counter;
  //この区間にはいれるのは1つの処理だけ
  //もしnew Mutex()ではなく
  //new Semaphore(2) としていたら２つだけ
  mutex.use(async () => {
    log(`[${c}]:begin`);
    await sleep(1500);
    log(`[${c}]:end`);
  });
});

clearButtonElem.addEventListener("click", async () => {
  counter = 0
  clearConsole();
});
