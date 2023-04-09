const { DateFormatTokenType, DateFormatLexer } = (function () {

  /**
   * 日付の種類を表すトークンの種類
   */
  const DateFormatTokenType = Object.freeze({
    AMPM: Symbol("a"),
    YY: Symbol("yy"),
    YYYY: Symbol("yyyy"),
    M_MONTH: Symbol("M"),
    MM_MONTH: Symbol("MM"),
    D: Symbol("d"),
    DD: Symbol("dd"),
    H_12: Symbol("h"),
    HH_12: Symbol("hh"),
    H: Symbol("H"),
    HH: Symbol("HH"),
    M_MINUTE: Symbol("m"),
    MM_MINUTE: Symbol("mm"),
    S_SECOND: Symbol("s"),
    SS_SECOND: Symbol("ss"),
    S_MILLISECOND: Symbol("S"),
    SS_MILLISECOND: Symbol("SS"),
    SSS_MILLISECOND: Symbol("SSS"),

    LITERAL: Symbol("LITERAL"),
    END: Symbol("END"),
  });

  /**
   * トークンを生成
   * 
   * @param {Symbol} tokenType トークンの種類
   * @param {String} value フォーマット文字列
   * @returns {{
   *  tokenType: Symbol,
   *  value: String
   * }} トークン
   */
  function newToken(tokenType, value) {
    return {
      tokenType,
      value,
    };
  }

  class DateFormatLexer {
    constructor(formatText) {
      this.src = new DateFormatSource(formatText);
    }

    /**
     * 次のトークンを取得
     * 
     * @returns 
     */
    nextToken() {
      const c = this.src.nextChar();
      if (c == null) {
        return newToken(DateFormatTokenType.END);
      }

      switch (c) {
        case "a":
          return newToken(DateFormatTokenType.AMPM, c);
        case "y":
          return this.readYear();
        case "M":
          return this.readMonth();
        case "d":
          return this.readDate();
        case "h":
          return this.readHour12();
        case "H":
          return this.readHour();
        case "m":
          return this.readMinute();
        case "s":
          return this.readSecond();
        case "S":
          return this.readMills();
        case "'":
          return this.readLiteral();
        default:
          return newToken(DateFormatTokenType.LITERAL, c);
      }
    }

    /**
     * 連続する間、文字を読み続けます
     * @param {String} char 対象の文字
     * @returns 連続した文字
     */
    readWhileSameChar(char) {
      let format = char;
      while (true) {
        const pc1 = this.src.peekNext();
        if (pc1 !== char) {
          break;
        }

        this.src.nextChar();
        format += pc1;
      }
      return format;
    }

    readYear() {
      const format = this.readWhileSameChar("y");

      if (format === "yyyy") {
        return newToken(DateFormatTokenType.YYYY, format);
      }
      if (format === "yy") {
        return newToken(DateFormatTokenType.YY, format);
      }

      throw new Error(`illegal year format = ${format}`);
    }

    readMonth() {
      const format = this.readWhileSameChar("M");

      if (format === "MM") {
        return newToken(DateFormatTokenType.MM_MONTH, format);
      }
      if (format === "M") {
        return newToken(DateFormatTokenType.M_MONTH, format);
      }

      throw new Error(`illegal month format = ${format}`);
    }

    readDate() {
      const format = this.readWhileSameChar("d");

      if (format === "dd") {
        return newToken(DateFormatTokenType.DD, format);
      }
      if (format === "d") {
        return newToken(DateFormatTokenType.D, format);
      }

      throw new Error(`illegal date format = ${format}`);
    }

    readHour12() {
      const format = this.readWhileSameChar("h");

      if (format === "hh") {
        return newToken(DateFormatTokenType.HH_12, format);
      }
      if (format === "h") {
        return newToken(DateFormatTokenType.H_12, format);
      }

      throw new Error(`illegal hour format = ${format}`);
    }

    readHour() {
      const format = this.readWhileSameChar("H");

      if (format === "HH") {
        return newToken(DateFormatTokenType.HH, format);
      }
      if (format === "H") {
        return newToken(DateFormatTokenType.H, format);
      }

      throw new Error(`illegal hour format = ${format}`);
    }

    readMinute() {
      const format = this.readWhileSameChar("m");

      if (format === "mm") {
        return newToken(DateFormatTokenType.MM_MINUTE, format);
      }
      if (format === "m") {
        return newToken(DateFormatTokenType.M_MINUTE, format);
      }

      throw new Error(`illegal minute format = ${format}`);
    }

    readSecond() {
      const format = this.readWhileSameChar("s");

      if (format === "ss") {
        return newToken(DateFormatTokenType.SS_SECOND, format);
      }
      if (format === "s") {
        return newToken(DateFormatTokenType.S_SECOND, format);
      }

      throw new Error(`illegal second format = ${format}`);
    }

    readMills() {
      const format = this.readWhileSameChar("S");

      if (format === "SSS") {
        return newToken(DateFormatTokenType.SSS_MILLISECOND, format);
      }
      if (format === "SS") {
        return newToken(DateFormatTokenType.SS_MILLISECOND, format);
      }
      if (format === "S") {
        return newToken(DateFormatTokenType.S_MILLISECOND, format);
      }

      throw new Error(`illegal mills format = ${format}`);
    }

    readLiteral() {
      let literal = "";
      while (true) {
        if (literal.length > 1000) {
          // もしバグってて無限ループした時用
          throw new Error("infinite loop");
        }

        const c = this.src.nextChar();
        if (c == null) {
          // シングルクォートで閉じられていない
          throw new Error(`end quote not found.`);
        }

        if (c !== "'") {
          literal += c;
          continue;
        }

        const pc = this.src.peekNext();
        if (pc === "'") {
          // シングルクォートのエスケープとして扱う
          this.src.nextChar();
          literal += c;
          continue;
        }

        return newToken(DateFormatTokenType.LITERAL, literal);
      }
    }
  }

  return {
    DateFormatTokenType,
    DateFormatLexer,
  };
})();
