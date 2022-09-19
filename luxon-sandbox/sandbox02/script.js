(function () {
  const DateTime = luxon.DateTime;
  
  {
    console.log('ISO 8601')
    const dt = DateTime.local()
    console.log(dt.toISO())
    console.log(dt.toISODate())
    console.log(dt.toISOTime())
    console.log(dt.toISOWeekDate())
  }

  {
    console.log('unix timestamp')
    const dt = DateTime.local()
    //unixミリ秒
    console.log(dt.toMillis())
    //小数点第3位まで
    console.log(dt.toSeconds())
    //toMillisと同じで大小比較とかするときにはこれが使われる
    console.log(dt.valueOf())
  }
  {
    console.log('locale string')
    
    const dt = DateTime.local()
    console.log(dt.toLocaleString())
    //DateTimeにいろいろフォーマットある
    //format.jsというところでいろいろ定義されている
    //各unitごとにnumeric, short, longという書式があるらしい(Intl.DateTimeFormatのもの？)
    //presetに組み合わせの一覧がある
    //https://moment.github.io/luxon/#/formatting?id=presets
    console.log(dt.toLocaleString(DateTime.DATETIME_FULL))
    console.log(dt.toLocaleString({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
    }))
    console.log(dt.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL))
    console.log('DateTime.DATETIME_FULL', DateTime.DATETIME_FULL)
  }

  {
    console.log('toFormat')
    const dt = DateTime.local()
    console.log(dt.toFormat('yyyy LLL dd'))
    //業務アプリで使いそうなフォーマット
    //フォーマットは
    //https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    console.log(dt.toFormat('yyyy/LL/dd HH:mm:ss.SSS'))
    //toFormatはen-USのLocaleになるので そういった文言のものにフォーマットする場合は変更が必要
    console.log(dt.setLocale('ja-JP').toFormat('yyyy LLL dd'))
  }
})();
