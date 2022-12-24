const { CsvLexer, CsvTokenType } = (function () {
  const CsvTokenType = Object.freeze({
    DELIMITER: Symbol("DELIMITER"),
    VALUE: Symbol("VALUE"),
    EOR: Symbol("EOR"),
    EOF: Symbol("EOF"),
  });

  function newToken(tokenType, value) {
    return {
      tokenType,
      value,
    };
  }

  class CsvLexer {
    constructor(source) {
      this.is = new CsvInputSource(source);
    }

    nextToken() {
      const c = this.is.nextChar();
      if (c == null) {
        return newToken(CsvTokenType.EOF);
      }

      switch (c) {
        case ",":
          return newToken(CsvTokenType.DELIMITER, c);
        case "\r":
          if (this.is.peekNext() === "\n") {
            // skip
            this.is.nextChar();
            return newToken(CsvTokenType.EOR, "\r\n");
          }
          return newToken(CsvTokenType.EOR, c);
        case "\n":
          return newToken(CsvTokenType.EOR, c);
        case '"':
          return this.readWhenQuoted();
        default:
          return this.read(c);
      }
    }

    /**
     * ダブルクォーテーションで囲まれていた時
     */
    readWhenQuoted() {
      let csvValue = "";

      while (true) {
        const c = this.is.nextChar();
        if (c == null) {
          throw new Error(
            "ダブルクォーテーションで囲まれた文字を読み取っている途中でファイルが終了しました。"
          );
        }

        switch (c) {
          case '"': {
            const p = this.is.peekNext();
            if (p === '"') {
              // ダブルクォートの連続は エスケープなので次の文字へ
              csvValue += c;
              this.is.nextChar();
              break;
            }

            // 次の文字がダブルクォート以外の場合は、値としての終了なので返す。
            return newToken(CsvTokenType.VALUE, csvValue);
          }
          default:
            // ダブルクォート以外の場合は文字列を蓄積していく
            csvValue += c;
            break;
        }
      }
    }

    read(firstChar) {
      let csvValue = firstChar;
      while (true) {
        const p = this.is.peekNext();
        if (p == null) {
          // 次が空の場合もファイルの終わり
          return newToken(CsvTokenType.VALUE, csvValue);
        }

        switch (p) {
          case ",":
          case "\r":
          case "\n":
            // 次がカンマだったり、改行の場合は、値の終わり
            return newToken(CsvTokenType.VALUE, csvValue);
          default:
            // それ以外の時は値がまだ続いているので蓄積する
            const c = this.is.nextChar();
            csvValue += c;
            break;
        }
      }
    }
  }

  return {
    CsvLexer,
    CsvTokenType,
  };
})();
