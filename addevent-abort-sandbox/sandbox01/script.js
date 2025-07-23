import { clearConsole, clearWhenClick, log } from "../domConsole.js";

const clickButtonElem = document.getElementById("clickButton");
const abortButtonElem = document.getElementById("abortButton");
const clearButtonElem = document.getElementById("clearButton");

clearWhenClick(clearButtonElem);

const abort = new AbortController();

clickButtonElem.addEventListener(
  "click",
  () => {
    log(`click! ${new Date().toISOString()}`);
  },
  {
    signal: abort.signal,
  }
);

abortButtonElem.addEventListener("click", () => {
  if (!abort.signal.aborted) {
    log(`abort したのでclickは反応しなくなります`);
    abort.abort();
  }
});
