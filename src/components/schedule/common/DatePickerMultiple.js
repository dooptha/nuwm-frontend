import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import DatePicker from './DatePicker';
import I18n from '../../../utils/i18n';
import { Flip2OutlineIcon } from '../../../assets/icons';

class CustomDatePicker extends Component {
  setDate(date) {
    this.setState({ date });
  }

  render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.datePickerContainer}>
        <Input style={themedStyle.backgroundInput} />
        <View style={themedStyle.datePicker}>
          <DatePicker
            ref={(node) => { this.datePickerNode = node; }}
          />
        </View>
        <Button
          style={themedStyle.button}
          icon={Flip2OutlineIcon}
          onPress={() => this.datePickerNode.switchPicker()}
        />
      </View>
    );
  }
}

export default withStyles(CustomDatePicker, (theme) => ({
  datePicker: {
    position: 'absolute',
    paddingLeft: '0%',
    marginLeft: '5%',
    width: '70%',
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
