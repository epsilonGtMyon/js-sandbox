const windowMap = new Map();

function openWindow() {
  const windowId = `window:` + crypto.randomUUID();
  const childWindow = window.open("child.html", windowId, "popup=true");
  windowMap.set(windowId, childWindow);
  return {
    windowId,
    childWindow,
  };
}

/**
 * windowを取得
 * 
 * @param {String | Window} windowOrWindowId
 * @returns {Window}
 */
function getWindow(windowOrWindowId) {
  let targetWindow;
  if (typeof windowOrWindowId === "string") {
    targetWindow = windowMap.get(windowOrWindowId);
  } else {
    targetWindow = windowOrWindowId;
  }

  if (targetWindow == null || targetWindow.closed) {
    throw new Error("Target window is closed or not found");
  }

  return targetWindow;
}

// --------------------------
//

/**
 * 対象のウィンドウに返信メッセージを送る
 * @param {String | Window} windowOrWindowId
 * @param {String} replyMessageId 返信対象のメッセージID
 * @param {*} data
 */
function reply(windowOrWindowId, replyMessageId, data) {
  const targetWindow = getWindow(windowOrWindowId);
  const messageId = `messageId:` + crypto.randomUUID();

  const sendData = {
    type: "window_message",
    subType1: "reply",
    messageId,
    replyMessageId,
    data,
  };

  targetWindow.postMessage(sendData, location.origin);
}

/**
 * メッセージの送信
 *
 * @param {String | Window} windowOrWindowId
 * @param {*} data
 */
function send(windowOrWindowId, data) {
  const targetWindow = getWindow(windowOrWindowId);
  const messageId = `messageId:` + crypto.randomUUID();
  const sendData = {
    type: "window_message",
    subType1: "normal",
    messageId,
    data,
  };
  targetWindow.postMessage(sendData, location.origin);
}

/**
 * メッセージを送信し返事を待つ
 * @param {String | Window} windowOrWindowId
 * @param {*} data
 * @returns
 */
function sendAndWait(windowOrWindowId, data) {
  const targetWindow = getWindow(windowOrWindowId);
  const messageId = `messageId:` + crypto.randomUUID();

  // 返信を待つためPromiseを返す
  return new Promise((resolve, reject) => {
    // 返信を受け取った時のハンドラを追加
    const replyMessageHandler = {
      targetWindow,
      messageId,
      handle: (event) => {
        resolve({
          event,
          data: event.data,
        });
      },
    };
    replyMessageHandlers.push(replyMessageHandler);

    // ------------------------------
    const sendData = {
      type: "window_message",
      subType1: "normal",
      messageId,
      data,
    };
    targetWindow.postMessage(sendData, location.origin);
  });
}

// --------------------------
// receive

const replyMessageHandlers = [];
const receivedMessageHandlers = [];

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin) {
    // セキュリティのために、originを確認し、対象外なら処理しない
    return;
  }
  const source = event.source;
  const data = event.data;

  if (data.type !== "window_message") {
    return;
  }

  if (data.subType1 === "reply") {
    // replyを受け取ったらreplyMessageHandlersから特定し、実行後に削除
    const replyMessageId = data.replyMessageId;

    // 対象の受信ハンドラを特定
    const replyMessageHandlerIndex = replyMessageHandlers.findIndex(
      (handler) => {
        return (
          handler.targetWindow === source &&
          handler.messageId === replyMessageId
        );
      }
    );

    if (replyMessageHandlerIndex >= 0) {
      // 返信の受信を取り出して実行(ハンドラ一覧からは削除)
      const replyMessageHandler = replyMessageHandlers.splice(
        replyMessageHandlerIndex,
        1
      )[0];
      replyMessageHandler.handle(event);
    }
  } else if (data.subType1 === "normal") {
    for (const handler of receivedMessageHandlers) {
      handler(event);
    }
  }
});

function addReceivedMessageHandler(handler) {
  receivedMessageHandlers.push(handler);
}

function removeReceivedMessageHandler(handler) {
  const index = receivedMessageHandlers.indexOf(handler);
  if (index >= 0) {
    receivedMessageHandlers.splice(index, 1);
  }
}

export {
  openWindow,
  reply,
  send,
  sendAndWait,
  addReceivedMessageHandler,
  removeReceivedMessageHandler,
};
