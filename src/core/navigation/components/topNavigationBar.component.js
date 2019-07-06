import React, { Component } from 'react';
import {
  withStyles,
} from 'react-native-ui-kitten';
import { ImageProps } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import { SafeAreaView } from './safeAreaView.component';

class TopNavigationBarComponent extends Component {

  renderBackButton(source) {
    return (
      <TopNavigationAction
        icon={source}
        onPress={() => this.props.onBackPress()}
      />
    );
  };

  render() {
    const { themedStyle, title, backIcon } = this.props;

    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          alignment='center'
          title={title}
          // titleStyle={textStyle.subtitle}
          // subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
        />
      </SafeAreaView>
    );
  }
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, (theme) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
