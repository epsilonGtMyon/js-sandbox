import "../style.css";
import { createHooks } from "hookable";
import { clearMessages, addMessage } from "../messages";
import { sleep } from "../util";

const hooks = createHooks();


// --------------

hooks.hook("hook1", async (a: any, b: any, c: any) => {
  addMessage("hook1-0", a, b, c);
});

hooks.hook("hook1", async (a: any, b: any, c: any) => {
  await sleep(1000)
  addMessage("hook1-1000", a, b, c);
});

hooks.hook("hook1", async (a: any, b: any, c: any) => {
  await sleep(2000)
  addMessage("hook1-2000", a, b, c);
});

hooks.hook("hook1", async (a: any, b: any, c: any) => {
  await sleep(3000)
  addMessage("hook1-3000", a, b, c);
});


// --------------
const callHookElem = document.getElementById("callHook");
const callHookParallelElem = document.getElementById("callHookParallel");

callHookElem?.addEventListener("click", async() => {
  clearMessages();
  addMessage("開始")
  const start = Date.now();
  await hooks.callHook("hook1", "a", 1, [1, 2], new Date());
  const end = Date.now();
  addMessage("終了", `${end - start}ms`)
});
callHookParallelElem?.addEventListener("click",async() => {
  clearMessages();
  addMessage("開始")
  const start = Date.now();
  await hooks.callHookParallel("hook1", "a", 1, [1, 2], new Date());
  const end = Date.now();
  addMessage("終了", `${end - start}ms`)
});
