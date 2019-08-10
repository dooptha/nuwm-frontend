import React, { Component } from 'react';
import { View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

class CircleWrapper extends Component {
  state = { active: false };

  setActive() {
    this.setState({ active: true });
  }

  setUnActive() {
    this.setState({ active: false });
  }

  render() {
    const { styles, themedStyle } = this.props;
    const { active } = this.state;
    return (
      <View style={[styles, active ? themedStyle.active : themedStyle.unactive]} />
    );
  }
}

export default withStyles(CircleWrapper, (theme) => ({
  unactive: {
    backgroundColor: theme['text-disabled-color'],
  },
  active: {
    backgroundColor: theme['background-primary-color-1'],
  },
}));
