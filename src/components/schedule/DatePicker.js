import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.transformDate(new Date()),
    };
  }

  setDate(date) {
    this.setState({ date: date.replace(/-/g, '.') });
  }

  setTwoFixedNumbers(int) {
    return (`0${int}`).slice(-2);
  }

  transformDate(date) {
    const day = this.setTwoFixedNumbers(date.getDate());
    const month = this.setTwoFixedNumbers(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  render() {
    const { date } = this.state;

    return (
      <DatePicker
        date={date}
        mode="date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        format="DD-MM-YYYY"
        onDateChange={(chosenDate) => this.setDate(chosenDate)}
      />
    );
  }
}
