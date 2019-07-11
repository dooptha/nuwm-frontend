import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Input } from 'react-native-ui-kitten';
import DatePicker from 'react-native-datepicker';

class CustomDatePicker extends Component {
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
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.datePickerContainer}>
        <Input style={themedStyle.backgroundInput} disabled />
        <DatePicker
          date={date}
          mode="date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          format="dddd DD MMMM YYYY"
          showIcon={false}
          style={themedStyle.datePicker}
          customStyles={{
            dateText: themedStyle.datePickerInput,
            dateInput: {
              borderWidth: 0,
            },
          }}
          onDateChange={(chosenDate) => this.setDate(chosenDate)}
        />
      </View>
    );
  }
}

export default withStyles(CustomDatePicker, (theme) => ({
  datePicker: {
    position: 'absolute',
    width: '80%',
    paddingTop: 4,
    paddingLeft: '0%',
  },
  datePickerInput: {
    color: theme['background-basic-color-1'],
  },
  datePickerContainer: {
    width: '100%',
  },
  backgroundInput: {
    borderRadius: 10,
    width: '80%',
  },
}));
