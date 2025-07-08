import "../style.css";

import {} from "setimmediate";
import { sleep } from "../common/util";
import { log, clearConsole } from "../common/domConsole";
import { anyGroup, useWithGroup, type GroupKey } from "./groupedMutex";

const groupA1ButtonElem = document.getElementById("groupA1Button")!;
const groupA2ButtonElem = document.getElementById("groupA2Button")!;
const groupB1ButtonElem = document.getElementById("groupB1Button")!;
const groupB2ButtonElem = document.getElementById("groupB2Button")!;
const groupAnyButtonElem = document.getElementById("groupAnyButton")!;
const clearButtonElem = document.getElementById("clearButton")!;

let counter = 0;

groupA1ButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  useWithGroup("GroupA", async () => {
    log(`[${c}]: A1: begin`);
    await sleep(1500);
    log(`[${c}]: A1: end`);
  });
});

groupA2ButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  useWithGroup("GroupA", async () => {
    log(`[${c}]: A2: begin`);
    await sleep(1500);
    log(`[${c}]: A2: end`);
  });
});


groupB1ButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  useWithGroup("GroupB", async () => {
    log(`[${c}]: B1: begin`);
    await sleep(1500);
    log(`[${c}]: B1: end`);
  });
});

groupB2ButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  useWithGroup("GroupB", async () => {
    log(`[${c}]: B2: begin`);
    await sleep(1500);
    log(`[${c}]: B2: end`);
  });
});

groupAnyButtonElem.addEventListener("click", async () => {
  const c = ++counter;

  useWithGroup(anyGroup, async () => {
    log(`[${c}]: Any: begin`);
    await sleep(1500);
    log(`[${c}]: Any: end`);
  });
});

clearButtonElem.addEventListener("click", async () => {
  counter = 0;
  clearConsole();
});
