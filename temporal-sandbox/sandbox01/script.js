function putDomValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function main() {
  const plainDate = Temporal.Now.plainDateISO();
  putDomValue("plainDate-year", plainDate.year);
  putDomValue("plainDate-month", plainDate.month);
  putDomValue("plainDate-day", plainDate.day);
  putDomValue("plainDate-inLeapYear", plainDate.inLeapYear);
  putDomValue("plainDate-dayOfWeek", plainDate.dayOfWeek);

  const plainTime = Temporal.Now.plainTimeISO();
  putDomValue("plainTime-hour", plainTime.hour);
  putDomValue("plainTime-minute", plainTime.minute);
  putDomValue("plainTime-second", plainTime.second);
  putDomValue("plainTime-millisecond", plainTime.millisecond);
  putDomValue("plainTime-microsecond", plainTime.microsecond);

  const plainDateTime = Temporal.Now.plainDateTimeISO();
  putDomValue("plainDateTime-year", plainDateTime.year);
  putDomValue("plainDateTime-month", plainDateTime.month);
  putDomValue("plainDateTime-day", plainDateTime.day);
  putDomValue("plainDateTime-inLeapYear", plainDateTime.inLeapYear);
  putDomValue("plainDateTime-dayOfWeek", plainDateTime.dayOfWeek);
  putDomValue("plainDateTime-hour", plainDateTime.hour);
  putDomValue("plainDateTime-minute", plainDateTime.minute);
  putDomValue("plainDateTime-second", plainDateTime.second);
  putDomValue("plainDateTime-millisecond", plainDateTime.millisecond);
  putDomValue("plainDateTime-microsecond", plainDateTime.microsecond);
}

setInterval(() => {
  main();
}, 500);

export {};
