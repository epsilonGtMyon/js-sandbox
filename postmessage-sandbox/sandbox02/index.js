import { openWindow, sendAndWait } from "./windowMessage.js";

const openChildButtonElem = document.getElementById("openChildButton");
const sendMessagButtonElem = document.getElementById("sendMessageButton");
const windowsElem = document.getElementById("windows");

openChildButtonElem.addEventListener("click", () => {
  const { windowId } = openWindow();

  const option = document.createElement("option");
  option.value = windowId;
  option.textContent = windowId;
  windowsElem.appendChild(option);
});

sendMessagButtonElem.addEventListener("click", async () => {
  const windowId = windowsElem.value;
  const replyData = await sendAndWait(windowId, {
    message: "hello"
  });

  console.log("replyData", replyData);
  window.alert(JSON.stringify(replyData.data.data))
});

export {};
