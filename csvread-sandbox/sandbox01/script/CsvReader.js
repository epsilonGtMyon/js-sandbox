const { CsvReader } = (function () {
  class CsvReader {
    /**
     * 全てのレコードを読み込みます。
     * @param {String} source
     * @returns CSVのレコード
     */
    readAll(source) {
      const lexer = new CsvLexer(source);

      const allRow = [];
      while (true) {
        const { record, eof } = this.readRecord(lexer);
        if (record.length > 0) {
          allRow.push(record);
        }

        if (eof) {
          break;
        }
      }

      return allRow;
    }

    /**
     * 全てのレコードを読み込み、行毎の値を返すジェネレータを返します。
     * @param {String} source
     */
    *readAsGenerator(source) {
      const lexer = new CsvLexer(source);

      while (true) {
        const { record, eof } = this.readRecord(lexer);
        if (record.length > 0) {
          yield record;
        }

        if (eof) {
          break;
        }
      }
    }

    /**
     * 1レコードを読み込みます。
     * @param {CsvLexer} lexer
     * @returns 1レコードの配列
     */
    readRecord(lexer) {
      const record = [];
      let previousToken = undefined;
      let t = undefined;
      while (true) {
        previousToken = t;
        t = lexer.nextToken();
        if (t.tokenType === CsvTokenType.EOF) {
          // ファイルの終わり
          return { record: record, eof: true };
        } else if (t.tokenType === CsvTokenType.VALUE) {
          record.push(t.value);
          continue;
        } else if (t.tokenType === CsvTokenType.DELIMITER) {
          if (
            previousToken === undefined ||
            previousToken.tokenType === CsvTokenType.DELIMITER
          ) {
            // カンマ2連続の場合もしくはいきなりカンマの場合
            // 空の値の事実が無くなってしまうのでここで追加
            record.push("");
          }
          continue;
        } else if (t.tokenType === CsvTokenType.EOR) {
          return { record: record, eof: false };
        }
      }
    }
  }

  return {
    CsvReader,
  };
})();
