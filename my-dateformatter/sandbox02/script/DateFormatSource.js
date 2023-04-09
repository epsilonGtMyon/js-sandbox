const { DateFormatSource } = (function () {
  class DateFormatSource {
    constructor(source) {
      this.source = source;
      this.currentPosition = -1;
    }

    nextChar() {
      this.currentPosition++;
      return this.source[this.currentPosition];
    }

    peekNext() {
      return this.source[this.currentPosition + 1];
    }
  }

  return {
    DateFormatSource,
  };
})();
