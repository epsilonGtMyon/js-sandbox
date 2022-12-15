const { DateFormat, formatDate } = (function () {
  const DateFormat = Object.freeze({
    FULL_DATE: "yyyy/MM/dd HH:mm:ss",
    SLASH_YMD: "yyyy/MM/dd",
    SLASH_YM: "yyyy/MM",
    HYPHEN_YMD: "yyyy-MM-dd",
    HYPHEN_YM: "yyyy-MM",
    JP_YMD: "yyyy年MM月dd日",
    JP_YM: "yyyy年MM月",
  });

  function createDatePartExtractor(d) {
    const pad = (value, length) => ("0".repeat(length) + value).slice(-length);

    return {
      get yyyy() {
        return pad(d.getFullYear(), 4);
      },
      get MM() {
        return pad(d.getMonth() + 1, 2);
      },
      get dd() {
        return pad(d.getDate(), 2);
      },
      get HH() {
        return pad(d.getHours(), 2);
      },
      get mm() {
        return pad(d.getMinutes(), 2);
      },
      get ss() {
        return pad(d.getSeconds(), 2);
      },
      get SSS() {
        return pad(d.getMilliseconds(), 2);
      },
    };
  }

  const formatters = new Map();
  formatters.set(
    DateFormat.FULL_DATE,
    (x) => `${x.yyyy}/${x.MM}/${x.dd} ${x.HH}:${x.mm}:${x.ss}`
  );
  formatters.set(DateFormat.SLASH_YMD, (x) => `${x.yyyy}/${x.MM}/${x.dd}`);
  formatters.set(DateFormat.SLASH_YM, (x) => `${x.yyyy}/${x.MM}`);
  formatters.set(DateFormat.HYPHEN_YMD, (x) => `${x.yyyy}-${x.MM}-${x.dd}`);
  formatters.set(DateFormat.HYPHEN_YM, (x) => `${x.yyyy}-${x.MM}`);
  formatters.set(DateFormat.JP_YMD, (x) => `${x.yyyy}年${x.MM}月${x.dd}日`);
  formatters.set(DateFormat.JP_YM, (x) => `${x.yyyy}年${x.MM}月`);

  function formatDate(value, format) {
    const ex = createDatePartExtractor(value);
    const formatter = formatters.get(format);
    return formatter(ex);
  }

  return {
    DateFormat,
    formatDate,
  };
})();
