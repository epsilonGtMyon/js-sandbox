(function () {
  const numberElem = document.getElementById("number");
  const halfAlphaElem = document.getElementById("half-alpha");
  const halfAlphaNumElem = document.getElementById("half-alpha-num");

  // -------------------------------------------------
  function sliceValue(value, func) {
    const i = [...value].findIndex((x) => !func(x));
    if (i < 0) {
      return value;
    }
    return value.slice(0, i);
  }

  function isNumber(value) {
    return "0" <= value && value <= "9";
  }

  numberElem.addEventListener("compositionend", (ev) => {
    ev.target.dataset.composition = "false";

    const value = ev.target.value;
    ev.target.value = sliceValue(value, isNumber)
  });
  numberElem.addEventListener("compositionstart", (ev) => {
    ev.target.dataset.composition = "true";
  });
  numberElem.addEventListener("input", (ev) => {
    if (ev.target.dataset.composition === "true") {
      return;
    }
    const value = ev.target.value;
    ev.target.value = sliceValue(value, isNumber)
  });

  // -------------------------------------------------

  function isHalfAlpha(value) {
    if ("a" <= value && value <= "z") {
      return true;
    }
    if ("A" <= value && value <= "Z") {
      return true;
    }
    return false;
  }
  
  halfAlphaElem.addEventListener("compositionend", (ev) => {
    ev.target.dataset.composition = "false";

    const value = ev.target.value;
    ev.target.value = sliceValue(value, isHalfAlpha)
  });
  halfAlphaElem.addEventListener("compositionstart", (ev) => {
    ev.target.dataset.composition = "true";
  });
  halfAlphaElem.addEventListener("input", (ev) => {
    if (ev.target.dataset.composition === "true") {
      return;
    }
    const value = ev.target.value;
    ev.target.value = sliceValue(value, isHalfAlpha)
  });

  // -------------------------------------------------
  
  function isHalfAlphaNum(value) {
    return isNumber(value) || isHalfAlpha(value)
  }
  
  halfAlphaNumElem.addEventListener("compositionend", (ev) => {
    ev.target.dataset.composition = "false";

    const value = ev.target.value;
    ev.target.value = sliceValue(value, isHalfAlphaNum)
  });
  halfAlphaNumElem.addEventListener("compositionstart", (ev) => {
    ev.target.dataset.composition = "true";
  });
  halfAlphaNumElem.addEventListener("input", (ev) => {
    if (ev.target.dataset.composition === "true") {
      return;
    }
    const value = ev.target.value;
    ev.target.value = sliceValue(value, isHalfAlphaNum)
  });
})();
