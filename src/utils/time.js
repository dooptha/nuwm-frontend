class TimeHelper {
  setTwoFixedNumbers(int) {
    return (`0${int}`).slice(-2);
  }

  toApiDateFormat(date) {
    const day = this.setTwoFixedNumbers(date.getDate());
    const month = this.setTwoFixedNumbers(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  getDateInAWeek(time) {
    return this.toApiDateFormat(time.setDate(time.getDate() + 7));
  }
}

export default new TimeHelper();
