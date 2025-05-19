import { PGlite } from "https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js";

const db = new PGlite();

await db.exec(`
  create table if not exists TODO (
    ID serial,
    TASK text,
    DONE boolean default false,
    constraint PK_TODO primary key (
      ID
    )
  );
`);

await db.exec(`
   insert into TODO (task, done) values ('飯を食う', false);
   insert into TODO (task, done) values ('買い物に行く', false);
   insert into TODO (task, done) values ('肉を買う', false);
`);

const initQuery01 = [...Array(200)]
  .map(
    (_, i) =>
      `insert into TODO (task, done) values ('あれこれ${i + 1}', ${i == 0});`
  )
  .join("\r\n");
await db.exec(initQuery01);

// ----------------------------
const sqlAreaElem = document.getElementById("sqlArea");
const executeQueryButtonElem = document.getElementById("executeQueryButton");
const queryResultElem = document.getElementById("queryResult");

executeQueryButtonElem.addEventListener("click", async () => {
  const sql = sqlAreaElem.value;

  await db.transaction(async (tx) => {
    try {
      const queryResult = await tx.query(sql);
      console.log(queryResult);
      applyQueryResult(queryResult);
    } catch (e) {
      window.alert("エラー:" + e.message);
      throw e;
    }
  });
});

function applyQueryResult(queryResult) {
  queryResultElem.querySelector("thead")?.remove();
  queryResultElem.querySelector("tbody")?.remove();

  const fields = queryResult.fields;

  // -----------
  // head
  const thead = document.createElement("thead");
  queryResultElem.append(thead);
  const theadTr = document.createElement("tr");
  thead.append(theadTr);
  for (const field of fields) {
    const th = document.createElement("th");
    th.textContent = field.name;
    theadTr.append(th);
  }

  // -----------
  // body
  const tbody = document.createElement("tbody");
  queryResultElem.append(tbody);
  for (const row of queryResult.rows) {
    const tbodyTr = document.createElement("tr");
    tbody.append(tbodyTr);
    for (const field of fields) {
      const td = document.createElement("td");
      td.textContent = row[field.name];
      tbodyTr.append(td);
    }
  }
}

sqlAreaElem.value = `select
  *
from
 TODO
order by
 ID
`;

export {};
