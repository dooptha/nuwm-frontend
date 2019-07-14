import React, { Component } from 'react';
import { withStyles } from 'react-native-ui-kitten';
import DatePicker from '../../../libs/react-native-date-ranges';

class Name extends Component {
  constructor(props) {
    super(props);

    this.placeholders = {
      range: '...        ->         ...',
      single: '...',
    };

    this.state = {
      mode: this.props.mode ? this.props.mode : 'range',
    };
  }

  switchPicker() {
    const { mode } = this.state;

    this.datePickerNode.setState({ selected: '', showContent: false });
    this.setState({ mode: mode === 'single' ? 'range' : 'single' });
  }

  render() {
    const { themedStyle } = this.props;
    const { mode } = this.state;

    const placeholder = mode === 'range'
      ? this.placeholders.range : this.placeholders.single;

    return (
      <DatePicker
      // styles
        style={themedStyle.datePicker}
        customStyles={{
          placeholderText: themedStyle.datePickerInput,
          contentText: themedStyle.datePickerInput,
          // colors
          main: themedStyle.main,
          sub: themedStyle.sub,
          mainText: themedStyle.mainText,
          subText: themedStyle.subText,
        }}
        selectedBgColor={themedStyle.main.backgroundColor}
        selectedTextColor={themedStyle.mainText.color}

      // locales
        local="uk"
        markText="Выберите Дату"
        ButtonText="Готово"
        startDateLabel="Старт"
        endDateLabel="Конец"

        outFormat="DD MMMM YY"
        dateSplitter="-"

        allowFontScaling={false}
        mode={mode}
        placeholder={placeholder}
        ref={(node) => { this.datePickerNode = node; }}
      />
    );
  }
}

export default withStyles(Name, (theme) => ({
  main: {
    backgroundColor: theme['background-basic-color-1'],
  },
  sub: {
    backgroundColor: theme['background-basic-color-2'],
  },
  mainText: {
    color: theme['text-basic-color'],
  },
  subText: {
    color: theme['text-hint-color'],
  },
  datePicker: {
    borderWidth: 0,
  },
  datePickerInput: {
    color: theme['text-hint-color'],
    fontSize: 15,
  },
}));
