(function () {
  const numberElem = document.getElementById("number");
  const halfAlphaElem = document.getElementById("half-alpha");
  const halfAlphaNumElem = document.getElementById("half-alpha-num");

  function isBackOrDelete(ev) {
    const key = ev.key;
    return key === "Backspace" || key === "Delete";
  }

  function isArrow(ev) {
    const key = ev.key;
    return (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    );
  }

  function isShift(ev) {
    const key = ev.key;
    return key === "shift";
  }

  // -------------------------------------------------

  function isNumber(key) {
    return "0" <= key && key <= "9";
  }

  numberElem.addEventListener("keydown", (ev) => {
    if (isBackOrDelete(ev) || isShift(ev) || isArrow(ev)) {
      // 文字消したり、シフト押しながら範囲選択とかの場合
      return;
    }

    const key = ev.key;
    if (isNumber(key)) {
      return;
    }
    // 対象の文字以外は抑制
    ev.preventDefault();
  });

  // -------------------------------------------------

  function isHalfAlpha(key) {
    if ("a" <= key && key <= "z") {
      return true;
    }
    if ("A" <= key && key <= "Z") {
      return true;
    }
    return false;
  }

  halfAlphaElem.addEventListener("keydown", (ev) => {
    if (isBackOrDelete(ev) || isShift(ev) || isArrow(ev)) {
      return;
    }

    const key = ev.key;
    if (isHalfAlpha(key)) {
      return;
    }
    ev.preventDefault();
  });
  
  // -------------------------------------------------

  halfAlphaNumElem.addEventListener("keydown", (ev) => {
    if (isBackOrDelete(ev) || isShift(ev) || isArrow(ev)) {
      return;
    }

    const key = ev.key;
    if (isHalfAlpha(key) || isNumber(key)) {
      return;
    }
    ev.preventDefault();
  });
})();
