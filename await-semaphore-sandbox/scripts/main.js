import {} from "setimmediate";

import { setupTryMutexUse } from "./setupTryMutexUse";
import { setupTrySemaphoreAcquire } from "./setupTrySemaphoreAcquire";
import { textareaConsole } from "./textareaConsole";

import "../style.css";

setupTryMutexUse();
setupTrySemaphoreAcquire();

document.getElementById("clear").addEventListener("click", () => {
  textareaConsole.clear();
});
