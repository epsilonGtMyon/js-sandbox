(function () {
  const DateTime = luxon.DateTime;
  const Duration = luxon.Duration;
  const Info = luxon.Info;
  const Interval = luxon.Interval;
  console.dir(DateTime)
  console.dir(Duration)
  console.dir(Info)
  console.dir(Interval)

  function print(dt) {
    console.log(dt, dt.toString(), dt.toISO());
  }

  {
    //現在時刻

    console.log("now");
    const n = DateTime.now(); //DateTime.local()と等価
    print(n);

    console.log("local");
    const l1 = DateTime.local(2022, 9, 14, 7, 10, 50, 12);
    print(l1);

    console.log("fromObject");
    const fo1 = DateTime.fromObject({ day: 22, hour: 12 });
    print(fo1);

    //指定しない場合、年月日は今、それ以降は0
    const fo2 = DateTime.fromObject({});
    print(fo2);

    console.log("fromISO");
    const iso1 = DateTime.fromISO("2017-05-15"); //=> May 15, 2017 at midnight
    print(iso1);
    const iso2 = DateTime.fromISO("2017-05-15T08:30:00"); //=> May 15, 2017 at 8:30
    print(iso2);
    const iso3 = DateTime.fromISO("2016-05-25T09:08:34.123+06:00", {
      setZone: true,
    });
    print(iso3);
  }

  {
    //いろいろなプロパティ
    const dt = DateTime.now();
    console.log({
      year: dt.year,
      month: dt.month,//monthが1始まりになってる
      day: dt.day,
      hour: dt.hour,
      minute: dt.minute,
      second: dt.second,
      millisecond: dt.millisecond,
    });
    console.log({
      locale: dt.locale,
      zoneName: dt.zoneName,
      offset: dt.offset,
      daysInYear: dt.daysInYear,
      daysInMonth: dt.daysInMonth,
    });
  }
  {
    //toLocaleString
    const dt = DateTime.now()
    console.log("toLocalString");
    console.log(dt.toLocaleString())
    console.log(dt.toLocaleString(DateTime.DATETIME_MED))
    console.log(dt.toLocaleString(DateTime.DATETIME_FULL))
    console.log(dt.toLocaleString(DateTime.DATETIME_HUGE))
    console.log(dt.toLocaleString(null, { locale: 'fr' }))

    console.log("toISO");
    console.log(dt.toISO())
  }

  {
    console.log("math");

    const dt = DateTime.local(2022, 1, 10, 12, 34, 56, 789)
    print(dt)
    print(dt.plus({ hours: 3, minutes: 2 }))
    print(dt.minus({ days: 7 }))
    print(dt.startOf('day'))
    print(dt.endOf('hour'))

    //immutable 変化していない
    print(dt)
  }
  {
    console.log('set')
    
    const dt = DateTime.local(2022, 1, 10, 12, 34, 56, 789)

    const d1 = dt.set({hour: 3})
    print(d1)
    
  }
  {
    //intl
    console.log('intl')
    const dt = DateTime.local(2022, 1, 10, 12, 34, 56, 789)
    const format = {month: 'long', day: 'numeric'};
    console.log(dt.setLocale('fr').toLocaleString(format))
    console.log(dt.setLocale('en-GB').toLocaleString(format))
    console.log(dt.setLocale('en-US').toLocaleString(format))
    console.log(dt.setLocale('ja-JP').toLocaleString(format))

    console.log(Info.months('long', {locale: 'fr'}))
    console.log(Info.months('long', {locale: 'en'}))
    console.log(Info.months('long', {locale: 'ja-JP'}))
  }
  {
    //timezone
    console.log('timezone')
    const dt = DateTime.now().setZone("America/Los_Angeles");
    print(dt)

    //utc
    console.log('utc')
    print(DateTime.utc(2017, 5, 15));
    print(DateTime.utc()); // now, in UTC time zone
    print(DateTime.now().toUTC());
    print(DateTime.utc().toLocal());
    //意味ないけど
    print(DateTime.now().toLocal());
  }
  {
    console.log('duration')
    const dur = Duration.fromObject({hours: 2, minutes: 3})
    console.log(dur.toHuman(), dur.toISO(), dur.toISOTime(), dur.toObject())
    console.log(dur.toMillis(), dur.as('minutes'))

    console.log(dur.hours)
    console.log(dur.minutes)
    console.log(dur.seconds)

    print(DateTime.now().plus(dur))

  }
  {
    //時間の期間を表すものだが
    //durationと違うのは「開始」「終了」が決まっている点
    console.log('interval')
    const dt1 = DateTime.local(2021, 9, 10, 1, 2, 3);
    const dt2 = DateTime.local(2023, 10, 11, 4, 5, 6);
    const i = Interval.fromDateTimes(dt1, dt2);
    console.log(i)

    console.log(i.length())
    console.log(i.length('years'))
    console.log(i.contains(DateTime.local(2022)))
    console.log(i.contains(dt1), '始点は含まれる')
    console.log(i.contains(dt2), '終点は含まれない')

    console.log(i.toISO())
    console.log(i.toString())

    //durationに変換できる
    const dur = i.toDuration()
    //これで見るとミリ秒表記になるみたい
    console.log(dur.toHuman(), dur.toISO(), dur.toISOTime(), dur.toObject())

  }
})();
