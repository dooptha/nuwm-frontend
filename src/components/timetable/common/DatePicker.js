import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withStyles } from 'react-native-ui-kitten';
import DatePicker from 'react-native-date-ranges';
import I18n from '../../../utils/i18n';
import FormInput from './Form/Input';

export class DatePickerWrapper extends Component {
  static defaultProps = {
    mode: 'range',
  }

  constructor(props) {
    super(props);

    const { mode } = this.props;
    this.localize = (t) => I18n.t(`timetable.datepicker.${t}`);

    this.placeholders = {
      range: '...        ->         ...',
      single: '...',
    };

    this.state = {
      mode: mode || 'range',
    };
  }

  switchPicker() {
    const { mode } = this.state;

    this.datePickerNode.setState({ selected: '', showContent: false });
    this.setState({
      mode: mode === 'single' ? 'range' : 'single',
    });
  }

  render() {
    const { mode } = this.state;
    const {
      themedStyle,
      label,
      onConfirm,
      status,
    } = this.props;

    const placeholder = mode === 'range'
      ? this.placeholders.range : this.placeholders.single;

    return (
      <View>
        <FormInput
          style={themedStyle.backgroundInput}
          label={label}
          status={status}
        />
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
          markText={this.localize('Choose Date')}
          ButtonText={this.localize('OK')}
          startDateLabel={this.localize('Start')}
          endDateLabel={this.localize('End')}

          outFormat="DD MMMM"
          returnFormat="DD.MM.YYYY"
          dateSplitter="-"

          allowFontScaling={false}
          mode={mode}
          placeholder={placeholder}
          onConfirm={onConfirm}
        />
      </View>
    );
  }
}

export default withStyles(DatePickerWrapper, (theme) => ({
  main: {
    backgroundColor: theme['background-basic-color-1'],
  },
  sub: {
    backgroundColor: theme['background-basic-color-3'],
  },
  mainText: {
    color: theme['text-basic-color'],
  },
  subText: {
    color: theme['text-hint-color'],
  },
  datePicker: {
    marginTop: 22,
    borderWidth: 0,
  },
  datePickerInput: {
    color: theme['text-hint-color'],
    fontSize: 15,
    marginLeft: -5,
  },
  backgroundInput: {
    position: 'absolute',
    borderRadius: 2,
    width: '100%',
    marginRight: '5%',
  },
}));

DatePickerWrapper.propTypes = {
  mode: PropTypes.oneOf(['single', 'range']),
};
