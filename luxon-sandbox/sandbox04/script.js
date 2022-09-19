(function () {
  const { DateTime, Duration, Interval } = luxon;
  {
    console.log("math");
    const d = DateTime.local(2017, 2, 13);
    //1か月後
    console.log(d.plus({ months: 1 }).toISODate()); //=> '2017-03-13'
    //30日後
    console.log(d.plus({ days: 30 }).toISODate()); //=> '2017-03-15'

    const d1 = DateTime.local(2020, 5, 31);
    console.log(d1.plus({ months: 1 }).toISO());

    console.log(DateTime.local(2022, 1, 31).plus({ months: 1 }).toISODate());
    console.log(DateTime.local(2022, 1, 30).plus({ months: 1 }).toISODate());
    console.log(DateTime.local(2022, 1, 29).plus({ months: 1 }).toISODate());
    console.log(DateTime.local(2022, 1, 28).plus({ months: 1 }).toISODate());
  }
  {
    console.log("Math with multiple units");
    //これは 上位のunitから適用されていくつまり1か月後のプラス1日5/31
    console.log(
      DateTime.fromISO("2017-04-30").plus({ months: 1, days: 1 }).toISODate()
    );
  }

  {
    console.log("compare");

    const dt1 = DateTime.local(2022, 1, 2);
    const dt2 = DateTime.local(2022, 1, 3);
    //valueOfを実装しててそれはエポックのタイムスタンプ(toMillisと同じ？)
    //ミリ秒で大小比較する
    console.log(`${dt1.toISODate()} < ${dt2.toISODate()}`, dt1 < dt2);

    //===で比較したら オブジェクトの比較になってしまうので注意
    //比較するなら以下の方法
    //ただしこれはタイムスタンプの比較だけ
    console.log(dt1.toMillis() === dt2.toMillis());
    console.log(+dt1 === +dt2);

    console.log("equals");
    //タイムゾーンみるならequals使う
    console.log(dt1.equals(dt2));

    console.log("hasSame");
    //他にはhasSameもある
    //指定したところよりも上位の単位も一致している必要がある
    //つまりdt2が2023年などだと全てfalseになる
    console.log(dt1.hasSame(dt2, "year"));
    console.log(dt1.hasSame(dt2, "month"));
    console.log(dt1.hasSame(dt2, "day"));
  }

  {
    console.log("duratinon");
    const dur = Duration.fromObject({ days: 3, hours: 6 });
    console.log(dur);
    console.log(dur.toObject());

    //number で取得
    //内部ではthis.shiftTo(unit).get(unit) が実行されている
    console.log(dur.as("minutes"));
    console.log(Duration.fromObject({ days: 3, hours: 6 }).as("months"));

    //dur間で変換
    console.log(dur.shiftTo("minutes").toObject());

    //DurationはDateTimeに加算できる
    console.log(DateTime.fromISO("2017-05-15").plus(dur).toISO());
  }

  {
    console.log("diff");
    //2つのDateTimeの差のDurationをとれる
    const start1 = DateTime.fromISO("2017-02-13");
    const end1 = DateTime.fromISO("2017-03-13");

    //diffの戻りはDuration
    const diffInMonths = end1.diff(start1, 'months');

    console.log(diffInMonths.toObject())

    console.log("diff2");
    //単位を省くとミリ秒に集約される
    const diff = end1.diff(start1)
    console.log(diff.toObject())

    console.log("diff3");
    //配列で複数にすることもできる
    const start2 = DateTime.fromISO('2017-02-11');
    const end2 = DateTime.fromISO('2017-03-13');
    console.log(end2.diff(start2, ['months', 'days']).toObject())
  }

  {
    console.log('conversion1')

    const dur = Duration.fromObject({months: 4, weeks: 2, days: 6})
    console.log(dur.as('days'))
    console.log(dur.shiftTo('days').toObject())
    console.log(dur.shiftTo('weeks', 'hours').toObject())
    //このルール
    // 1 week = 7 days
    // 1 day = 24 hours
    // 1 hour = 60 minutes
    // 1 minute = 60 seconds
    // 1 second = 1000 milliseconds

    //ただ、月とか年になると 月の日数とかうるう年の時の年の日数とかでズレてくる
    //luxonでは原則のルールがある
    //だからこういう事をするとずれる
    //1年→12か月→360日→1年で少し足りなくなる
    console.log(Duration.fromObject({ years:1 }).shiftTo('months').shiftTo('days').as('years'))
  }
  {
    console.log('conversion longterm')
    //長い年月の変換をすると 誤差が蓄積して大きな値になるので
    //luxonではlongtermとよばれる400年周期のカレンダー変換のスキームがある
    //longtermに対するものがcasual

    const dur1 = Duration.fromObject({ years: 23 }, { conversionAccuracy: 'longterm' });
    console.log(dur1)
    const dur2 = Duration.fromISO('PY23', { conversionAccuracy: 'longterm' });
    console.log(dur2)
    
    //const dur3 = end.diff(start, 'days', { conversionAccuracy: 'longterm' })

    //既存のDurationに対しても.reconfigure({ conversionAccuracy: 'longterm' })
    //とすることで変換できる
  }

  {
    console.log('Losing information') 
    const start1 = DateTime.fromISO('2017-02-13');
    const end1 = DateTime.fromISO('2017-03-13');
    
    //月に変換してから日にすることで正確な日数ではなくなる問題
    //durationは期間ではなく時間の量なので
    //インプットが何なのかは残っていないというのを押さえておきましょう
    const diffInMonths1 = end1.diff(start1, 'months');
    console.log(diffInMonths1.as('days')) //=> 30
    
    const diffInMonths2 = end1.diff(start1, 'days');
    console.log(diffInMonths2.as('days'))

    
    //milliseconds
    const diffInMonths3 = end1.diff(start1);
    console.log(diffInMonths3.as('months'))
    //タイムゾーンによってはこれもずれる
    console.log(diffInMonths3.shiftTo('hours').as('days'))

    //変に単位変換をしようとするとこの問題がおきるので
    //diffメソッドを呼ぶ時点で始めから欲しい単位を渡しておけば良い
  }

  {
    //Intervalだとstart-endの地点を保持するので
    //lengthでほしい値を出すことができる。
    console.log('interval')
    const start1 = DateTime.fromISO('2017-02-13');
    const end1 = DateTime.fromISO('2017-03-13');
    const in1 = Interval.fromDateTimes(start1, end1);

    console.log(in1.length('days'))
    console.log(in1.length('months'))

    //intervalは期間なのでDateTimeにはplusできない
    //なのでその時はtoDuration('months')などでDurationに変換してから使う
    //toDuration(['years', 'months', 'days'])ってこともできる。

    //Durationにしてしまうと単位変換の問題がでるので
    //どの時点でそうするかは注意して設計する必要あり
  }
})();
