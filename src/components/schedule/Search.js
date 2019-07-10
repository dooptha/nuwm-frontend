import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, withStyles } from 'react-native-ui-kitten';
import DatePicker from './DatePicker';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <DatePicker
          ref={(node) => { this.startDate = node; }}
        />
        <DatePicker
          ref={(node) => { this.endDate = node; }}
        />
        <Button onPress={() => this.onPress()}>Find</Button>
      </View>
    );
  }
}

export default withStyles(Search, (theme) => ({
  text: {
    color: theme['background-basic-color-1'],
  },
}));
