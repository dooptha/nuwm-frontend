import React, { Component } from 'react';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import SafeAreaView from './SafeAreaView';

class TopNavigationBar extends Component {
  renderBackButton(source) {
    const { onBackPress } = this.props;
    return (
      <TopNavigationAction
        icon={source}
        onPress={() => onBackPress()}
      />
    );
  }

  render() {
    const {
      themedStyle,
      title,
      backIcon,
      border,
    } = this.props;

    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView style={border ? themedStyle.safeAreaWithBorder : themedStyle.safeArea}>
        <TopNavigation
          alignment="center"
          title={title}
          // titleStyle={textStyle.subtitle}
          // subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
        />
      </SafeAreaView>
    );
  }
}

export default withStyles(TopNavigationBar, (theme) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
  safeAreaWithBorder: {
    backgroundColor: theme['background-basic-color-1'],
    borderBottomWidth: 2,
    borderBottomColor: theme['background-basic-color-3'],
  },
}));
