const t = document.getElementById("textareaConsole");

const textareaConsole = {
  clear() {
    t.value = "";
  },
  append(text) {
    const currentValue = t.value;
    if (currentValue === "") {
      t.value = text;
    } else {
      t.value = `${currentValue}
${text}`;
    }
  },
};

export { textareaConsole };
