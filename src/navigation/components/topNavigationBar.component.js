import React, { Component } from 'react';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import SafeAreaView from './safeAreaView.component';

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
    const { themedStyle, title, backIcon } = this.props;

    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
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
}));
