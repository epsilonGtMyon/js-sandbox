(function () {
  // ----------------------------------
  const value01Elem = document.getElementById("value01");
  const value02Elem = document.getElementById("value02");
  const concatButtonElem = document.getElementById("concatButton");
  const resultTextElem = document.getElementById("resultText");

  function concatText(left, right) {
    return `${left} ${right}`;
  }

  const proxyConcatText = new Proxy(concatText, {
    apply(target, thisArg, argumentsList) {
      console.log("args:", argumentsList)
      const r = Reflect.apply(...arguments)
      console.log(`return:`, r)
      return r;
    }
  })

  function execute() {
    const value01 = value01Elem.value
    const value02 = value02Elem.value

    resultTextElem.textContent = proxyConcatText(value01, value02)
  }

  concatButtonElem.addEventListener("click", () => {
    execute()
  });
})();
