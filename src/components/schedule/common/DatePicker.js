import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'react-native-ui-kitten';
import DatePicker from '../../../libs/react-native-date-ranges';
import { StateContext } from '../../../utils/context';

class DatePickerWrapper extends Component {
  static contextType = StateContext;

  static defaultProps = {
    mode: 'single',
  }

  constructor(props) {
    super(props);

    const { mode } = this.props;

    this.placeholders = {
      range: '...        ->         ...',
      single: '...',
    };

    this.state = {
      mode: mode || 'range',
      startDate: null,
      endDate: null,
    };
  }


  getCurrentLocale() {
    const [{ properties }] = this.context;

    switch (properties.language) {
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

    this.datePickerNode.setState({ selected: '', showContent: false });
    this.setState({
      mode: mode === 'single' ? 'range' : 'single',
      startDate: null,
      endDate: null,
    });
  }

  render() {
    const { props: { themedStyle }, state: { mode } } = this;

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

export default withStyles(DatePickerWrapper, (theme) => ({
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

DatePickerWrapper.propTypes = {
  mode: PropTypes.oneOf(['single', 'range']),
};
