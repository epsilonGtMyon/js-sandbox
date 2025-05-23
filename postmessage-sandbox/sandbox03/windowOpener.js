/**
 * ウィンドウを開き待機
 *
 * @param {String} path パス
 * @returns {Promise} 閉じるまで待機
 */
function openWindowAndWait(path) {
  return new Promise((resolve, reject) => {
    const windowId = `window:` + crypto.randomUUID();
    const childWindow = window.open(path, windowId, "popup=true");

    // ------------------

    const beforeCloseHandler = {
      targetWindow: childWindow,
      handle(event) {
        // 閉じる前のイベントを受け取ったとき
        resolve({
          event,
          data: event.data,
        });

        // 呼び出し元に結果を受け取ったことを通知
        childWindow.postMessage(
          {
            type: "window_before_close_ok",
          },
          location.origin
        );
      },
      reject(e) {
        reject(e);
      },
    };

    beforeCloseHandlers.push(beforeCloseHandler);
  });
}

/**
 * 親ウィンドウに閉じる前であることを知らせる
 * @param {Object} result ウィンドウの戻り値
 * @returns {Promise} 親ウィンドウが閉じる準備OKの通知をもらうまで待機
 */
function sendBeforeClose(result) {
  const targetWindow = window.opener;
  if (targetWindow == null || targetWindow.closed) {
    throw new Error("targetWindow is null or closed");
  }

  return new Promise((resolve, reject) => {
    // 親ウィンドウに結果を返す
    targetWindow.postMessage(
      {
        type: "window_before_close",
        result,
      },
      location.origin
    );

    // ------------------

    // 親ウィンドウからの閉じる準備OKの通知を待つ
    const beforeCloseOkHandler = {
      targetWindow,
      handle() {
        resolve();
      },
      reject(e) {
        reject(e);
      },
    };

    beforeCloseOkHandlers.push(beforeCloseOkHandler);
  });
}

// --------------------

const beforeCloseHandlers = [];
const beforeCloseOkHandlers = [];

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin) {
    // セキュリティのために、originを確認し、対象外なら処理しない
    return;
  }
  const source = event.source;
  const data = event.data;

  if (data.type === "window_before_close") {
    const idx = beforeCloseHandlers.findIndex(
      (handler) => handler.targetWindow === source
    );
    if (idx >= 0) {
      const handler = beforeCloseHandlers.splice(idx, 1)[0];
      handler.handle(event);
    }
  } else if (data.type === "window_before_close_ok") {
    const idx = beforeCloseOkHandlers.findIndex(
      (handler) => handler.targetWindow === source
    );

    if (idx >= 0) {
      const handler = beforeCloseOkHandlers.splice(idx, 1)[0];
      handler.handle(event);
    }
  }
});

// 対象ウィンドウのモニタリング
const timerId = setInterval(() => {
  for (let i = 0; i < beforeCloseHandlers.length; i++) {
    const handler = beforeCloseHandlers[i];
    if (handler.targetWindow.closed) {
      handler.reject(new Error("targetWindow is closed"));
      beforeCloseHandlers.splice(i, 1);
      i--;
    }
  }

  // ----------------
  for (let i = 0; i < beforeCloseOkHandlers.length; i++) {
    const handler = beforeCloseOkHandlers[i];
    if (handler.targetWindow.closed) {
      handler.reject(new Error("targetWindow is closed"));
      beforeCloseOkHandlers.splice(i, 1);
      i--;
    }
  }
}, 1000);

export { openWindowAndWait, sendBeforeClose };
