import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles, Button } from 'react-native-ui-kitten';
import DatePicker from './DatePicker';
import FormInput from './Form/Input';
import { Flip2OutlineIcon } from '../../../assets/icons';

class CustomDatePicker extends Component {
  render() {
    const { themedStyle } = this.props;

    return (
      <View style={themedStyle.datePickerContainer}>
        <FormInput
          style={themedStyle.backgroundInput}
          ref={(node) => { this.inputNode = node; }}
        />
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

export default withStyles(CustomDatePicker, () => ({
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
