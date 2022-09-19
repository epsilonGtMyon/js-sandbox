(function () {
  const DateTime = luxon.DateTime;


  function print(dt) {
    console.log(dt, dt.toISO())
  }


  {

    console.log('iso')

    //いろいろな形式がfromISOで対応している
    //https://moment.github.io/luxon/#/parsing?id=iso-8601
    const dt1 = DateTime.fromISO('2022-05-12')
    print(dt1)
    
    const dt2 = DateTime.fromISO('20220512')
    print(dt2)

    const dt3 = DateTime.fromISO('09:24:15')
    print(dt3)

    const dt4 = DateTime.fromISO('09:01:02.123')
    print(dt4)
    
    const dt5 = DateTime.fromISO('2022-01-02T01:02:03.456+09:00')
    print(dt5)

    const dt6 = DateTime.fromISO('2022-01-02T01:02:03.456+08:00', {setZone: true})
    print(dt6)
    
    //ZはUTC
    const dt7 = DateTime.fromISO('2022-01-02T01:02:03.456Z')
    print(dt7)

    //第2引数にはzoneなどを含んだオプションをとれる
  }

  {
    console.log('sql')

    const dt1 = DateTime.fromSQL('2017-05-15')
    print(dt1)
    const dt2 = DateTime.fromSQL('2017-05-15 09:24:15')
    print(dt2)
    const dt3 = DateTime.fromSQL('09:24:15')
    print(dt3)
  }

  {
    console.log('unix timestamp')

    const dt1 = DateTime.fromMillis(1542674993410)
    print(dt1)
    
    const dt2 = DateTime.fromSeconds(1542674993)
    print(dt2)
  }

  {
    console.log('js native Date')

    const d1 = new Date(2022, 5, 10 ,1 ,2 ,3, 456)
    const dt1 = DateTime.fromJSDate(d1)
    print(dt1)

  }
  {
    console.log('from format')
    const dt1 = DateTime.fromFormat('2022-05-01 11:22:33', 'yyyy-LL-dd HH:mm:ss')
    print(dt1)
  }
})();
