
const value1 = 'Taro';
const value2 = 20;
const value3 = false;

const identityText = identity
`select
  *
from
  hoge
where
  foo1 = ${value1}
and foo2 = ${value2}
and foo3 = ${value3}
`

const sqlText = sql
`select
  *
from
  hoge
where
  foo1 = ${value1}
and foo2 = ${value2}
and foo3 = ${value3}
`

document.getElementById('identity').innerText= identityText
document.getElementById('sql').innerText= sqlText