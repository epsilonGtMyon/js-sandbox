import "../style.css";
import { createHooks } from "hookable";
import { clearMessages, addMessage } from "../messages";
import { sleep } from "../util";

const hooks = createHooks();

hooks.beforeEach((event) => {
  addMessage("beforeEach");
  addMessage(event);
});
hooks.afterEach((event) => {
  addMessage("afterEach");
  addMessage(event);
});

// --------------

hooks.hook("hook1", (a: any, b: any, c: any) => {
  addMessage("hook1", a, b, c);
});

const unHook2 = hooks.hook("hook2", (a: any, b: any, c: any) => {
  addMessage("hook2", a, b, c);
});

hooks.hook("hook3", async (a: any, b: any, c: any) => {
  addMessage("hook3:a", a, b, c);
  await sleep(1000);
  addMessage("hook3:b", a, b, c);
});
7;

hooks.hook("hook1", async (a: any, b: any, c: any) => {
  addMessage("hook1:a", a, b, c);
  await sleep(1000);
  addMessage("hook1:b", a, b, c);
});

// --------------
const hook1Elem = document.getElementById("hook1");
const hook2Elem = document.getElementById("hook2");
const hook3Elem = document.getElementById("hook3");

const unHook2Elem = document.getElementById("unHook2");

hook1Elem?.addEventListener("click", () => {
  clearMessages();
  hooks.callHook("hook1", "a", 1, [1, 2], new Date());
});
hook2Elem?.addEventListener("click", () => {
  clearMessages();
  hooks.callHook("hook2", "a", 1, [1, 2], new Date());
});
hook3Elem?.addEventListener("click", () => {
  clearMessages();
  hooks.callHook("hook3", "a", 1, [1, 2], new Date());
});
unHook2Elem?.addEventListener("click", () => {
  unHook2();
});
