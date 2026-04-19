(function () {
  const numberElem = document.getElementById("number");
  const halfAlphaElem = document.getElementById("half-alpha");
  const halfAlphaNumElem = document.getElementById("half-alpha-num");

  // -------------------------------------------------

  /**
   * 文字列を先頭から順に見ていき、funcの条件を満たさない文字が出てくるまでの部分文字列を返す。
   *
   * @param {string} value
   * @param {(char: string) => boolean} func
   * @returns {string}
   */
  function sliceValue(value, func) {
    const i = [...value].findIndex((x) => !func(x));
    if (i < 0) {
      return value;
    }
    return value.slice(0, i);
  }

  /**
   * IME 変換中かどうかを判定する。
   * @param {KeyboardEvent} ev
   * @returns {boolean}
   */
  function isComposing(ev) {
    if (ev.isComposing) {
      return true;
    }
    // isComposingは1文字目はfalseとなることがあるらしく
    // keyCodeは非推奨であるもののこれで判定できるため、これも使う
    return ev.keyCode === 229;
  }

  /**
   * inputイベントとcompositionendイベントに対して、
   * funcの条件を満たさない文字が出てくるまでの部分文字列をinputElementの値として設定するイベントリスナーを登録する。
   *
   * @param {HTMLInputElement} inputElement
   * @param {(char: string) => boolean} func
   */
  function applyInputFilter(inputElement, func) {
    inputElement.addEventListener("compositionend", (ev) => {
      const value = ev.target.value;
      ev.target.value = sliceValue(value, func);
    });

    inputElement.addEventListener("input", (ev) => {
      if (isComposing(ev)) {
        //IME 変換中 はそのままにしておく
        return;
      }
      const value = ev.target.value;
      ev.target.value = sliceValue(value, func);
    });
  }

  /**
   * valueが半角数字であればtrueを返す。
   *
   * @param {string} value
   * @return {boolean}
   */
  function isNumber(value) {
    return "0" <= value && value <= "9";
  }

  /**
   * valueが半角英字であればtrueを返す。
   *
   * @param {string} value
   * @return {boolean}
   */
  function isHalfAlpha(value) {
    if ("a" <= value && value <= "z") {
      return true;
    }
    if ("A" <= value && value <= "Z") {
      return true;
    }
    return false;
  }

  /**
   * valueが半角英数字であればtrueを返す。
   *
   * @param {string} value
   * @return {boolean}
   */
  function isHalfAlphaNum(value) {
    return isNumber(value) || isHalfAlpha(value);
  }

  // -------------------------------------------------

  applyInputFilter(numberElem, isNumber);

  applyInputFilter(halfAlphaElem, isHalfAlpha);

  applyInputFilter(halfAlphaNumElem, isHalfAlphaNum);
})();
