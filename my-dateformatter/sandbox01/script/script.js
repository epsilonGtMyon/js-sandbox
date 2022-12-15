(function () {
  const dateTableElem = document.getElementById("dateTable");

  const now = new Date();
  const records = Object.values(DateFormat).map((format) => ({
    format,
    value: formatDate(now, format),
  }));

  for (const rec of records) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.textContent = rec.format;
    td2.textContent = rec.value;

    tr.append(td1);
    tr.append(td2);
    dateTableElem.append(tr);
  }
})();
