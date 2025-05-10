const openChildButtonElem = document.getElementById("openChildButton");
const sendMessageButtonElem = document.getElementById("sendMessageButton");
const windowsElem = document.getElementById("windows");

const windowMap = new Map();

openChildButtonElem.addEventListener("click", () => {
  const windowId = `window_` + crypto.randomUUID();

  const childWindow = window.open("child.html", windowId, "popup=true");

  windowMap.set(windowId, childWindow);

  const option = document.createElement("option");
  option.value = windowId;
  option.textContent = windowId;
  windowsElem.appendChild(option);
});

sendMessageButtonElem.addEventListener("click", () => {
  const targetWindow = windowMap.get(windowsElem.value);
  if (targetWindow == null || targetWindow.closed) {
    windowsElem.querySelector(`option[value="${windowsElem.value}"]`).remove();
    console.error("Child window is closed");
    return;
  }
  targetWindow.postMessage("hello", location.origin);
});

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin) {
    // セキュリティのために、originを確認し、対象外なら処理しない
    return;
  }
  console.log(event);

  // sourceはwindowが入っている, 開くときに与えたwindowIdはwindow.nameでとれる、つまりsource.name
  const source = event.source;
  const data = event.data;
  console.log("source:", source);
  console.log("data:", data);
});

export {};
