import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import DatePicker from 'react-native-date-ranges';
import I18n from '../../../utils/i18n';
import { Flip2OutlineIcon } from '../../../assets/icons';

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'single',
    };
  }

  setDate(date) {
    this.setState({ date });
  }

  changeDatePicker() {
    console.log(this.datePickerNode.setState({ selected: '', showContent: false }));
    const { mode } = this.state;
    this.setState({ mode: mode === 'single' ? 'range' : 'single' });
  }

  render() {
    const { date, mode } = this.state;
    const { themedStyle } = this.props;

    const placeholder = mode === 'range' ? '...        ->         ...' : '...';

    return (
      <View style={themedStyle.datePickerContainer}>
        <Input style={themedStyle.backgroundInput} />
        <DatePicker
          style={themedStyle.datePicker}
          customStyles={{
            placeholderText: themedStyle.datePickerInput, // placeHolder style
            headerStyle: { }, // title container style
            headerMarkTitle: { }, // title mark style
            headerDateTitle: { }, // title Date style
            contentInput: { }, // content text container style
            contentText: themedStyle.datePickerInput, // after selected text Style
          }} // optional
          allowFontScaling={false} // optional
          mode={mode}
          outFormat="DD MMMM YY"
          dateSplitter="-"
          placeholder={placeholder}
          ref={(node) => { this.datePickerNode = node; }}
        />
        <Button style={themedStyle.button} icon={Flip2OutlineIcon} onPress={() => this.changeDatePicker()} />
      </View>
    );
  }
}

export default withStyles(CustomDatePicker, (theme) => ({
  datePicker: {
    position: 'absolute',
    paddingLeft: '0%',
    marginLeft: '5%',
    borderWidth: 0,
    width: '70%',
  },
  datePickerInput: {
    color: theme['text-hint-color'],
    fontSize: 15,
  },
  datePickerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  backgroundInput: {
    borderRadius: 2,
    width: '75%',
    marginRight: '5%',
  },
  button: {
    width: '20%',
    marginTop: 1,
    height: 44,
  },
}));
