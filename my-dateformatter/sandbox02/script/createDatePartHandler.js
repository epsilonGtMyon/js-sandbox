const { createDatePartHandler } = (function () {
  function pad0(value, length) {
    return ("0".repeat(length) + value).slice(-length);
  }

  /**
   * トークンから日付を処理する関数を作成します。
   * 
   * @param {*} token 
   * @returns 日付を処理する関数
   */
  function createDatePartHandler(token) {
    const tokenType = token.tokenType;
    const value = token.value;

    switch (tokenType) {
      case DateFormatTokenType.AMPM: {
        return (date) => (date.getHours() >= 12 ? "PM" : "AM");
      }
      case DateFormatTokenType.YY: {
        return (date) => {
          const year2 = date.getFullYear() % 100;
          return pad0(year2, 2);
        };
      }
      case DateFormatTokenType.YYYY: {
        return (date) => pad0(date.getFullYear(), 4);
      }
      case DateFormatTokenType.M_MONTH: {
        return (date) => String(date.getMonth() + 1);
      }
      case DateFormatTokenType.MM_MONTH: {
        return (date) => pad0(date.getMonth() + 1, 2);
      }
      case DateFormatTokenType.D: {
        return (date) => String(date.getDate());
      }
      case DateFormatTokenType.DD: {
        return (date) => pad0(date.getDate(), 2);
      }
      case DateFormatTokenType.H_12: {
        return (date) => String(date.getHours() % 12);
      }
      case DateFormatTokenType.HH_12: {
        return (date) => pad0(date.getHours() % 12, 2);
      }
      case DateFormatTokenType.H: {
        return (date) => String(date.getHours());
      }
      case DateFormatTokenType.HH: {
        return (date) => pad0(date.getHours(), 2);
      }
      case DateFormatTokenType.M_MINUTE: {
        return (date) => String(date.getMinutes());
      }
      case DateFormatTokenType.MM_MINUTE: {
        return (date) => pad0(date.getMinutes(), 2);
      }
      case DateFormatTokenType.S_SECOND: {
        return (date) => String(date.getSeconds());
      }
      case DateFormatTokenType.SS_SECOND: {
        return (date) => pad0(date.getSeconds(), 2);
      }
      case DateFormatTokenType.S_MILLISECOND: {
        return (date) => {
          const mills1 = Math.floor(date.getMilliseconds() / 100);
          return String(mills1);
        };
      }
      case DateFormatTokenType.SS_MILLISECOND: {
        return (date) => {
          const mills2 = Math.floor(date.getMilliseconds() / 10);
          return pad0(mills2, 2);
        };
      }
      case DateFormatTokenType.SSS_MILLISECOND: {
        return (date) => pad0(date.getMilliseconds(), 3);
      }
      case DateFormatTokenType.LITERAL: {
        return () => value;
      }
      default:
        throw new Error(
          `unknown token tokenType = ${tokenType}, value = ${value}`
        );
    }
  }

  return {
    createDatePartHandler,
  };
})();
