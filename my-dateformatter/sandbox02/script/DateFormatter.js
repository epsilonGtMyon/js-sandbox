const { DateFormatter } = (function () {
  class DateFormatter {

    /**
     * フォーマットします。
     * 
     * @param {Date} value 対象の日付
     * @param {String} format フォーマット文字列
     * @returns {String} フォーマット後の文字列
     */
    static format(value, format) {
      const datePartHandlers = DateFormatter.getDatePartHandlers(format)

      // 日付パート毎に変換をしてその結果の文字列を結合
      return datePartHandlers.map(h => h(value)).join("")
    }

    static getDatePartHandlers(format) {
      const lexer = new DateFormatLexer(format);
      
      const datePartHandlers = [];
      while (true) {
        // フォーマット文字列を解析して各パート毎にトークンを生成
        const token = lexer.nextToken();
        if (token.tokenType === DateFormatTokenType.END) {
          break;
        }
        datePartHandlers.push(createDatePartHandler(token));
      }
      
      return datePartHandlers
    }
  }

  return {
    DateFormatter,
  };
})();
