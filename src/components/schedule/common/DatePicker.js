import React, { Component } from 'react';
import { withStyles } from 'react-native-ui-kitten';
import DatePicker from '../../../libs/react-native-date-ranges';
import { StateContext } from '../../../utils/context';

class Name extends Component {
  static contextType = StateContext;

  constructor(props) {
    super(props);

    this.placeholders = {
      range: '...        ->         ...',
      single: '...',
    };

    this.state = {
      mode: this.props.mode || 'range',
      startDate: null,
      endDate: null,
    };
  }

  getCurrentLocale() {
    const [{ app }] = this.context;
    
    switch (app.properties.language) {
      case 'ua': return 'uk';
      case 'ru': return 'ru';
      case 'en': return 'en-ua';
      default: return 'ua';
    }
  }

  getDate() {
    const { startDate, endDate } = this.state;
    return { startDate, endDate };
  }

  setDate(data) {
    const { currentDate, startDate, endDate } = data;

    if (currentDate) {
      this.setState({ startDate: currentDate, endDate: currentDate });
    } else {
      this.setState({ startDate, endDate });
    }
  }

  switchPicker() {
    const { mode } = this.state;
    console.log(this.getDate());

    this.datePickerNode.setState({ selected: '', showContent: false });
    this.setState({
      mode: mode === 'single' ? 'range' : 'single',
      startDate: null,
      endDate: null,
    });
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
        local={this.getCurrentLocale()}
        markText="Выберите Дату"
        ButtonText="Готово"
        startDateLabel="Старт"
        endDateLabel="Конец"

        outFormat="DD MMMM"
        returnFormat="DD.MM.YYYY"
        dateSplitter="-"

        allowFontScaling={false}
        mode={mode}
        placeholder={placeholder}
        ref={(node) => { this.datePickerNode = node; }}
        onConfirm={(data) => this.setDate(data)}
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
    marginLeft: -5,
  },
}));