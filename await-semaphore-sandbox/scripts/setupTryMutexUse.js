import { Mutex } from "await-semaphore";
import { sleep } from "./sleep";
import { textareaConsole } from "./textareaConsole";

//new Mutex()は new Semaphore(1)のこと
const mutex = new Mutex();
let counter = 0;

async function tryMutexUse() {
  const c = ++counter;

  //この区間にはいれるのは1つの処理だけ
  //もしnew Mutex()ではなく
  //new Semaphore(2) としていたら２つだけ
  mutex.use(async () => {
    textareaConsole.append(`begin mutex: sleep ${c}`);
    await sleep(1500);
    textareaConsole.append(`end mutex: sleep ${c}`);
  });
}

async function setupTryMutexUse() {
  document.getElementById("mutex").addEventListener("click", () => {
    tryMutexUse();
  });
}

export { setupTryMutexUse };
