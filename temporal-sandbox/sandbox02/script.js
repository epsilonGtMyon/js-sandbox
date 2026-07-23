function putDomValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function main() {
  const now = Temporal.Now.plainDateTimeISO();
  const newYear = now.with({
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  const duration1 = now.since(newYear);
  const duration2 = now.since(newYear, { largestUnit: "months" });

  putDomValue("duration1-years", duration1.years);
  putDomValue("duration1-months", duration1.months);
  putDomValue("duration1-days", duration1.days);
  putDomValue("duration1-hours", duration1.hours);
  putDomValue("duration1-minutes", duration1.minutes);
  putDomValue("duration1-seconds", duration1.seconds);

  putDomValue("duration2-years", duration2.years);
  putDomValue("duration2-months", duration2.months);
  putDomValue("duration2-days", duration2.days);
  putDomValue("duration2-hours", duration2.hours);
  putDomValue("duration2-minutes", duration2.minutes);
  putDomValue("duration2-seconds", duration2.seconds);
}

setInterval(() => {
  main();
}, 500);

export {};
