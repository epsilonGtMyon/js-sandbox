const messagesElem = document.getElementById("messages")!;

function clearMessages() {
  while (messagesElem.firstChild) {
    messagesElem.removeChild(messagesElem.firstChild);
  }
}

function addMessage(...messages: any[]) {
  console.log([...messages]);

  const div = document.createElement("div");
  div.textContent = messages.map(x => {
    if(Array.isArray(x)) {
      return x
    }
    if(x instanceof Date) {
      x
    }
    if(x instanceof Object){
      return Object.entries(x).reduce((p, c) => {
        return `${p} ${c[0]}=${c[1]}`
      },"")
    }


    return x
  }).join(" ");
  div.classList.add("message");

  messagesElem.append(div);
}

export {
  clearMessages,
  addMessage
}