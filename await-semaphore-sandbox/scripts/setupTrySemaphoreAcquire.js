import { Semaphore } from "await-semaphore";
import { sleep } from "./sleep";
import { textareaConsole } from "./textareaConsole";

const semaphore = new Semaphore(2);
let counter = 0;

async function trySemaphoreAcquire() {
  const c = ++counter;

  //排他を取得して
  //releaseを呼び出したら解放する
  const release = await semaphore.acquire();

  try {
    //この区間にはいれるのは2つの処理だけ
    textareaConsole.append(`begin semaphore: sleep ${c}`);
    await sleep(1500);
    textareaConsole.append(`end semaphore: sleep ${c}`);
  } finally {
    //finally確実に呼ばれるようにしておいたほうがいいだろう
    release();
  }
}

function setupTrySemaphoreAcquire() {
  document.getElementById("semaphore").addEventListener("click", () => {
    trySemaphoreAcquire();
  });
}

export { setupTrySemaphoreAcquire };
