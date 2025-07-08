const consoleElem = document.getElementById("console")!;

function clearConsole() {
  while (consoleElem.firstChild) {
    consoleElem.removeChild(consoleElem.firstChild);
  }
}

function log(text: string) {
  const div = document.createElement("div");
  div.textContent = text;
  consoleElem.append(div);
  
  const parentElem = consoleElem.parentElement!
  parentElem.scrollTo(0, parentElem.scrollHeight);
}

export { clearConsole, log };
