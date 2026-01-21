const rowCount = document.getElementById("rowCount");
const btnAddRow = document.getElementById("btnAddRow");
const btnClearTable = document.getElementById("btnClearTable");
const appTable = document.getElementById("appTable");
console.log(appTable);

const appTableBody = appTable.querySelector("tbody");

function clearTable() {
  appTableBody.innerHTML = "";
}

btnClearTable.addEventListener("click", () => {
  clearTable();
});

btnAddRow.addEventListener("click", () => {
  if (!/^\d+$/.test(rowCount.value)) {
    alert("数値を入力してください");
    return;
  }
  clearTable();

  const count = Number(rowCount.value);

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const tr = document.createElement("tr");

    const tdNo = document.createElement("td");
    tdNo.textContent = i + 1;
    tr.appendChild(tdNo);

    const tdCol1 = document.createElement("td");
    tdCol1.textContent = `col1-${i + 1}`;
    tr.appendChild(tdCol1);

    fragment.appendChild(tr);
  }
  appTableBody.appendChild(fragment);
});
