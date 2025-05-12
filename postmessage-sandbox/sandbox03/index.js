import { openWindowAndWait } from "./windowOpener.js";
import { log, clearConsole } from "./domConsole.js";

const clearConsoleButtonElem = document.getElementById("clearConsoleButton");
const openChild1ButtonElem = document.getElementById("openChild1Button");
const openChild2ButtonElem = document.getElementById("openChild2Button");

clearConsoleButtonElem.addEventListener("click", () => {
  clearConsole();
});

openChild1ButtonElem.addEventListener("click", async () => {
  try {
    const result = await openWindowAndWait("child1.html");
    console.log("result", result);
    log("[child1] " + JSON.stringify(result.data.result));
  } catch (e) {
    console.error(e);
    log("[child1] " + e.message);
  }
});

openChild2ButtonElem.addEventListener("click", async () => {
  try {
    const result = await openWindowAndWait("child2.html");
    console.log("result", result);
    log("[child2] " + JSON.stringify(result.data.result));
  } catch (e) {
    console.error(e);
    log("[child2] " + e.message);
  }
});

export {};
