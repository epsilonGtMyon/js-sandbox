(function () {
  const formatTableElem = document.getElementById("formatTable");

  const yearElem = document.getElementById("year");
  const monthElem = document.getElementById("month");
  const dateElem = document.getElementById("date");
  const hourElem = document.getElementById("hour");
  const minuteElem = document.getElementById("minute");
  const secondElem = document.getElementById("second");
  const millisecondElem = document.getElementById("millisecond");

  const freeFormatElem = document.getElementById("freeFormat");
  const freeFormatResultElem = document.getElementById("freeFormatResult");

  const applyCurrentDateElem = document.getElementById("applyCurrentDate");
  const applyFormatElem = document.getElementById("applyFormat");

  function applyCurrentDate() {
    const now = new Date();
    yearElem.value = now.getFullYear();
    monthElem.value = now.getMonth() + 1;
    dateElem.value = now.getDate();
    hourElem.value = now.getHours();
    minuteElem.value = now.getMinutes();
    secondElem.value = now.getSeconds();
    millisecondElem.value = now.getMilliseconds();
  }

  function getDateFromInput() {
    const year = yearElem.value;
    const month = monthElem.value;
    const date = dateElem.value;
    const hour = hourElem.value;
    const minute = minuteElem.value;
    const second = secondElem.value;
    const millisecond = millisecondElem.value;

    return new Date(year, month - 1, date, hour, minute, second, millisecond);
  }

  function applyFormat() {
    const date = getDateFromInput();

    // テーブル部分への適用
    const trs = formatTableElem.querySelectorAll("tbody tr");
    for (const tr of trs) {
      const format = tr.querySelector(".formatTable-format");
      const result = tr.querySelector(".formatTable-result");

      result.textContent = DateFormatter.format(date, format.textContent);
    }

    // フリーフォーマット
    try {
      freeFormatResultElem.textContent = DateFormatter.format(date, freeFormatElem.value);
    } catch (e) {
      console.error(e)
      freeFormatResultElem.textContent = `フォーマットできませんでした:${e.message}`;
    }
  }

  applyCurrentDateElem.addEventListener("click", () => {
    applyCurrentDate();
  });
  applyFormatElem.addEventListener("click", () => {
    applyFormat();
  });

  applyCurrentDate();
  applyFormat();
})();
