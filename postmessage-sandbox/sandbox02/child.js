import { reply } from "./windowMessage.js";
const messagesElem = document.getElementById("messages");

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin) {
    return;
  }
  const source = event.source;
  const data = event.data;

  if (data.type !== "window_message") {
    return;
  }

  // 受け取ったらDOM追加
  const messageContainer = document.createElement("div");
  messageContainer.id = data.messageId;

  const messageReplyInput = document.createElement("input");
  messageContainer.appendChild(messageReplyInput);

  const messageReplyButton = document.createElement("button");
  messageReplyButton.textContent = "Reply";
  messageReplyButton.addEventListener("click", () => {
    const replyMessage = messageReplyInput.value;
    reply(source, data.messageId, {
      replyMessage,
    });

    messagesElem.removeChild(messageContainer);
  });
  messageContainer.appendChild(messageReplyButton);

  messagesElem.appendChild(messageContainer);
});
