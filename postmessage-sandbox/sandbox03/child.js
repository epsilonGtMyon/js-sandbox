import { sendBeforeClose } from "./windowOpener.js";

const closeButtonElem = document.getElementById("closeButton");
const closeMessageElem = document.getElementById("closeMessage");

closeButtonElem.addEventListener("click", async () => {
  // 親ウィンドウがOK出すまで待機
  await sendBeforeClose({
    value: closeMessageElem.value,
  });

  // 親ウィンドウは戻り値を受け取っているので閉じる
  window.close();
});

export {};
