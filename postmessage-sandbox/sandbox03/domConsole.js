const consoleElem = document.getElementById("console");

function clearConsole() {
  while (consoleElem.firstChild) {
    consoleElem.removeChild(consoleElem.firstChild);
  }
}

function log(text) {
  const div = document.createElement("div");
  div.textContent = text;
  consoleElem.append(div);
  consoleElem.parentElement.scrollTo(0, consoleElem.parentElement.scrollHeight);
}

export { clearConsole, log };
