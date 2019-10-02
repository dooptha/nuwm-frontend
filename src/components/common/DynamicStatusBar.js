import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';

class DynamicStatusBar extends Component {
  getStatusBarContent() {
    const { currentTheme } = this.props;

    return currentTheme === 'Eva Light'
      ? 'dark-content'
      : 'light-content';
  }

  render() {
    const { themedStyle } = this.props;

    const androidStatusBarBgColor = themedStyle.container.backgroundColor;
    const barStyle = this.getStatusBarContent();

    return (
      <View style={themedStyle.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

export default withStyles(DynamicStatusBar, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    height: 0,
  },
}));
